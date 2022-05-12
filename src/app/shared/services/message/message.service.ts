import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject$: Subject<string | null> = new Subject();
  backToMainPageSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  message$ = this.messageSubject$.asObservable();
  private errorSubject$: Subject<string> = new Subject();
  error$ = this.errorSubject$.asObservable();

  constructor() { }

  setNewMessage(message: string | null): void {
    this.messageSubject$.next(message);
  }

  setNewError(message: string): void {
    this.errorSubject$.next(message);
  }

  setBackToMainPage(value: boolean): void {
    this.backToMainPageSubject$.next(value);
  }
}
