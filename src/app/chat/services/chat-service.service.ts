import {EventEmitter, Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from "@aspnet/signalr";
import {StorageService} from "../../shared/services/storage/storage.service";
import {NewMessage} from "../models/chat.model";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  messageReceived$ = new EventEmitter<any>();

  private _hubConnection: HubConnection;

  constructor(
    private storageService: StorageService
  ) {
    this.createConnection();
    this.registerOnServerEvents();
  }


  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl("https://sophisteducation-001-site1.itempurl.com/chat")
      .configureLogging(LogLevel.Information)
      .build();
      this.startConnection()

  }

  startConnection(): void {
    this._hubConnection.start().then(() => {
      console.log('Hub connection started');
    }).catch(err => {
      console.log(err)
      // setTimeout(() => this.startConnection(), 5000);
    });
  }

  selectConversation(message: any): void {
    this._hubConnection.invoke("JoinChat", { ...message});

  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveMessage', (message) => {
      this.messageReceived$.emit(message);
    });

    this._hubConnection.on("UsersInRoom", (users) => {
      console.log(users);
    });
  }

  sendMessage(message: NewMessage): void {
    this._hubConnection.invoke("SendMessage", message);
  }

}


