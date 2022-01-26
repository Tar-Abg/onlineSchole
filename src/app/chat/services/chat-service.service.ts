import { Injectable, EventEmitter } from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from "@aspnet/signalr";
import {StorageService} from "../../shared/services/storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  messageReceived = new EventEmitter<any>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor(
    private storageService: StorageService
  ) {
    this.startConnection()
  }



  startConnection = async () => {
    try {
      this._hubConnection = new HubConnectionBuilder()
        .withUrl("https://sophisteducation-001-site1.itempurl.com/chat")
        .configureLogging(LogLevel.Information)
        .build();

      this._hubConnection.on("ReceiveMessage", (user, message) => {
        console.log(message,user );
        this.messageReceived.emit({message, user});
      });

      this._hubConnection.on("UsersInRoom", (users) => {
        console.log(users);
        // setUsers(users);
      });


      await this._hubConnection.start();
      // await
      // setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  }

  joinRoom(user: string, room: string): void {
    this._hubConnection.invoke("JoinRoom", { user, room });
  }

  sendMessage = async (message: any) => {
    try {
      await this._hubConnection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }
}


