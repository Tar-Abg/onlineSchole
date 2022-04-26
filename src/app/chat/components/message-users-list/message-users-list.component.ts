import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conversation} from "../../models/chat.model";

@Component({
  selector: 'app-message-users-list',
  templateUrl: './message-users-list.component.html',
  styleUrls: ['./message-users-list.component.scss']
})
export class MessageUsersListComponent implements OnInit {
  @Output() selectConversation: EventEmitter<Conversation> = new EventEmitter<Conversation>();
  @Input() set conversation(selectedConversation: Conversation) {
    if (selectedConversation) {
      this.selectedConversation = selectedConversation;
    }
  };
  @Input() conversations: Conversation[];
  selectedConversation: Conversation;


  constructor(
  ) { }

  ngOnInit(): void {
  }

  onSelectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
    this.selectConversation.emit(conversation);
  }
}
