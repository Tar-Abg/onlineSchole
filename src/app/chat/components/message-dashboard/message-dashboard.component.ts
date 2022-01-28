import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChatServiceService} from "../../services/chat-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";

@Component({
  selector: 'app-message-dashboard',
  templateUrl: './message-dashboard.component.html',
  styleUrls: ['./message-dashboard.component.scss']
})
export class MessageDashboardComponent implements OnInit {
  form: FormGroup;
  messages: { message: string, userId: string }[] = [];
  userId: number;

  constructor(
    private chatServiceService: ChatServiceService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: [null, [Validators.required]]
    });

    this.chatServiceService.messageReceived.subscribe(message => {
      console.log(message);
      this.messages.push(message);
      this.cd.detectChanges()
    })

    this.userId = this.storageService.getUserId();
  }

  sendMessage(): void {
    if (this.form.valid) {
      this.chatServiceService.sendMessage(this.form.value.message);
      this.form.reset();
    }
  }


  joinRoom(): void {
    const userId = this.storageService.getUserId();
    this.chatServiceService.joinRoom('15', `${45}room`)
  }
}
