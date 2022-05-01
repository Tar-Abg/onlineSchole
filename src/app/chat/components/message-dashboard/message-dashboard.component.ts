import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatServiceService} from "../../services/chat-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {ChatApiService} from "../../services/chat-api.service";
import {Subscription} from "rxjs";
import {Conversation, DayChat, Messages} from "../../models/chat.model";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-message-dashboard',
  templateUrl: './message-dashboard.component.html',
  styleUrls: ['./message-dashboard.component.scss']
})
export class MessageDashboardComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messageBox') messageBox: ElementRef;
  private readonly subscription: Subscription = new Subscription();
  selectedConversation: Conversation;
  conversations: Conversation[];
  originalConversations: Conversation[];
  messages: DayChat[];
  form: FormGroup;
  searchForm: FormGroup;
  userId: number;

  constructor(
    private chatServiceService: ChatServiceService,
    private chatApiService: ChatApiService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.initializeForms();
    this.searchSubscription();
    this.receiveMessage();
    this.subscribeRouterEvents();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  subscribeRouterEvents(): void {
    this.subscription.add(
      this.route.queryParams.subscribe((data) => {
        if (data.userId) {
          this.openChat(+data.userId);
        } else {
          this.getChats();
        }
        this.location.replaceState(this.location.path().split('?')[0], '');
      })
    );
  }

  receiveMessage(): void {
    this.subscription.add(
      this.chatServiceService.messageReceived$.subscribe(message => {
        this.checkAndUpdateChat(message);
      })
    );
  }

  checkAndUpdateChat(message: Messages): void {
    if (this.selectedConversation && (this.selectedConversation?.chatId === message.chatId)) {
      this.messages[this.messages.length - 1].messages.push(message);
      this.selectedConversation.lastMessage = message.message as string;
      this.cd.detectChanges();
      this.scrollToBottom();
    } else {
      this.getChats(true);
    }
  }


  getChats(update: boolean = false): void {
    this.userId = this.storageService.getUserId();
    this.subscription.add(
      this.chatApiService.getChats(this.userId, update).subscribe(conversations => this.selectAndConnectConversation(conversations))
    );
  }

  openChat(userId: number): void {
    this.subscription.add(
      this.chatApiService.openChat(userId).subscribe(conversations => {
        this.selectAndConnectConversation(conversations);
        this.selectedConversation = this.conversations[0];
      })
    );
  }

  selectAndConnectConversation(conversations: Conversation[]): void {
    this.originalConversations = JSON.parse(JSON.stringify(conversations));
    this.conversations = conversations;
    if (!this.chatServiceService.connectionCreated) {
      this.chatServiceService.createConnection();
      this.chatServiceService.registerOnServerEvents();
    }
  }

  sendMessage(): void {
    if (this.form.valid) {
      const message = this.createNewMessage();
      this.chatServiceService.sendMessage(message).then(() => {
        this.updateDashboard(message)
      });
    }
  }

  createNewMessage(): Messages {
    return {
      chatId: this.selectedConversation.chatId,
      userId: this.storageService.getUserId(),
      message: this.form.value.message,
      senderId: this.storageService.getUserId(),
      receiverId: this.selectedConversation.userId
    }
  }

  updateDashboard(message: Messages): void {
    if (this.messages?.length) {
      this.messages[this.messages.length - 1].messages.push({
        ...message, messageDate: new Date().toString(),
      });
    } else {
      this.messages = [];
      const newMessage: DayChat  = {
        date: new Date().toString(),
        messages: [{
          ...message, messageDate: new Date().toString(),
        }]
      }
      this.messages.push(newMessage);
    }
    this.selectedConversation.lastMessage = message.message as string;
    this.cd.detectChanges();
    this.scrollToBottom();
    this.form.reset();
  }

  initializeForms(): void {
    this.form = this.fb.group({
      message: [null, [Validators.required]]
    });
    this.searchForm = this.fb.group({
      search: [null, [Validators.required]]
    });
  }

  searchSubscription(): void {
    this.subscription.add(
      this.searchForm.get('search')?.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe((value: string) => this.searchConversation(value))
    );
  }

  searchConversation(value: string): void {
    if (value) {
      this.conversations = this.originalConversations.filter(conversation => {
        return conversation.lastName.toLowerCase().includes(value.toLowerCase()) || conversation.firstName.toLowerCase().includes(value.toLowerCase())
      })
    } else {
      this.conversations = JSON.parse(JSON.stringify(this.originalConversations));
    }
    this.cd.detectChanges()
  }


  selectConversation(conversation: Conversation): void {
    this.markAsRead(conversation);
    this.selectedConversation = conversation;
    this.getMessages(conversation.chatId);
  }

  getMessages(chatId: number): void {
    this.subscription.add(
      this.chatApiService.getMessages(chatId).subscribe(data => {
        this.messages = data;
      })
    );
  }

  markAsRead(conversation: Conversation): void {
    if (conversation.unreadMessagesCount) {
      this.subscription.add(
        this.chatApiService.markAsRead(conversation.chatId).subscribe(() => this.selectedConversation.unreadMessagesCount = 0)
      );
    }
  }

  scrollToBottom(): void {
    try {
      this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight;
      this.cd.detectChanges()
    } catch (err) {
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.chatServiceService.connectionCreated = false;
  }
}
