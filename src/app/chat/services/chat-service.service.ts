import {EventEmitter, Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from "@aspnet/signalr";
import {StorageService} from "../../shared/services/storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  messageReceived = new EventEmitter<any>();
  connectionEstablished = new EventEmitter<Boolean>();

  private _hubConnection: HubConnection;

  constructor(
    private storageService: StorageService
  ) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }


  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl("https://sophisteducation-001-site1.itempurl.com/chat")
      .configureLogging(LogLevel.Information)
      .build();

  }

  private startConnection(): void {

    const userId = this.storageService.getUserId();
    this._hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
        this._hubConnection.invoke("JoinRoom", { user:  userId.toString(), room : 'room' });
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(() => this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveMessage', (userId: any, message) => {
      this.messageReceived.emit({message, userId});
    });

    this._hubConnection.on("UsersInRoom", (users) => {
      console.log(users);
    });
  }

  sendMessage(message: any) {
    this._hubConnection.invoke("SendMessage", message);
  }

}


