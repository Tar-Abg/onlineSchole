import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Conversation, DayChat} from "../models/chat.model";
import {ResponseModel} from "../../shared/models/responseModel.model";
import {map} from "rxjs/operators";
import {StorageService} from "../../shared/services/storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  private readonly url = `${environment.apiUrl}/Chat`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  getChats(userId: number, update: boolean): Observable<Conversation[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('update', update);
    return this.http.get<ResponseModel<Conversation[]>>(`${this.url}/GetChats`, {params}).pipe(
      map(data => data.result)
    )
  }

  openChat(userId: number): Observable<Conversation[]> {
    const body = {
      receiverId: userId,
      senderId: this.storageService.getUserId()
    }
    return this.http.post<ResponseModel<Conversation[]>>(`${this.url}/OpenChat`, body).pipe(
      map(data => data.result)
    )
  }

  getMessages(chatId: number): Observable<DayChat[]> {
    let params = new HttpParams();
    params = params.append('chatId', chatId);
    return this.http.get<ResponseModel<DayChat[]>>(`${this.url}/GetMessages`, {params}).pipe(
      map(data => data.result)
    )
  }

  markAsRead(chatId: number, update = false): Observable<any> {
    const body = {
      chatId
    }
    let params = new HttpParams();
    params = params.append('update', update);
    return this.http.put<ResponseModel<any>>(`${this.url}/MarkAsRead`, body, {params})
  }

}
