import {Component, OnInit} from '@angular/core';
import {MessageService} from "../shared/services/message/message.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {
  errorMessage$: Observable<string>;

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.errorMessage$ = this.messageService.error$;
  }

  clearMessage(): void {
    this.messageService.setNewError('');
  }

}
