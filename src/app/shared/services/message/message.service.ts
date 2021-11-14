import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject$: Subject<string | null> = new Subject();
  backToMainPageSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  message$ = this.messageSubject$.asObservable();

  constructor() { }

  setNewMessage(message: string | null): void {
    this.messageSubject$.next(message);
  }

  setBackToMainPage(value: boolean): void {
    this.backToMainPageSubject$.next(value);
  }
}
