import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ChatServiceService} from "../../services/chat-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {ChatApiService} from "../../services/chat-api.service";
import {Observable, Subscription} from "rxjs";
import {Conversation, DayChat, NewMessage} from "../../models/chat.model";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-message-dashboard',
  templateUrl: './message-dashboard.component.html',
  styleUrls: ['./message-dashboard.component.scss']
})
export class MessageDashboardComponent implements OnInit, OnDestroy {
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
  ) {
  }

  ngOnInit(): void {
    this.initializeForms();
    this.searchSubscription();
    this.receiveMessage();
    this.getChats();
  }

  receiveMessage(): void {
    this.subscription.add(
      this.chatServiceService.messageReceived$.subscribe(message => {
        this.messages[this.messages.length - 1].messages.push(message);
        this.cd.detectChanges()
      })
    );
  }

  getChats(): void {
    this.userId = this.storageService.getUserId();
    this.subscription.add(
      this.chatApiService.getChats(this.userId).subscribe(conversations => {
        this.originalConversations = JSON.parse(JSON.stringify(conversations));
        this.conversations = conversations;
      })
    );
  }

  sendMessage(): void {
    if (this.form.valid) {
      const message: NewMessage = {
        chatId: this.selectedConversation.chatId,
        message: this.form.value.message,
        senderId: this.storageService.getUserId()
      }
      this.chatServiceService.sendMessage(message);
      this.form.reset();
    }
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
    const chat = {
      chatName: conversation.chatId.toString(),
      firstName: conversation.firstName,
      lastName: conversation.lastName,
    }
    this.chatServiceService.selectConversation(chat)
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
        this.chatApiService.markAsRead(conversation.chatId).subscribe()
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
