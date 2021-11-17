import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {MessageService} from "../../services/message/message.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  message$: Observable<string | null>;

  constructor(
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.message$ = this.messageService.message$;
  }

  close(): void {
    this.messageService.setNewMessage(null);
    if (this.messageService.backToMainPageSubject$.getValue()) {
      this.router.navigate(['./']);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
