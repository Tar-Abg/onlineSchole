import {EventEmitter, Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from "@aspnet/signalr";
import {StorageService} from "../../shared/services/storage/storage.service";
import {Messages} from "../models/chat.model";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  messageReceived$ = new EventEmitter<any>();
  connectionCreated: boolean;

  private _hubConnection: HubConnection;

  constructor(
    private storageService: StorageService
  ) {

  }

  createConnection() {
    const token = JSON.parse(this.storageService.getItem('auth_token'));
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`https://sophisteducation-001-site1.itempurl.com/chat?token=${decodeURIComponent(token) }`)
      .configureLogging(LogLevel.Information)
      .build();
      this.startConnection()

  }

  startConnection(): void {
    this._hubConnection.start().then(() => {
      console.log('Hub connection started');
      this.connectionCreated = true;
    }).catch(err => {
      this.connectionCreated = false;
      setTimeout(() => this.startConnection(), 5000);
    });
  }

  registerOnServerEvents(): void {
    this._hubConnection.on('Send', (message) => {
      this.messageReceived$.emit(message);
    });
  }

  sendMessage(message: Messages): Promise<any> {
    return this._hubConnection.invoke("SendMessage", message);
  }

}


