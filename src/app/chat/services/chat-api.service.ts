import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Conversation, DayChat} from "../models/chat.model";
import {ResponseModel} from "../../shared/models/responseModel.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  private readonly url = `${environment.apiUrl}/Chat`

  constructor(
    private http: HttpClient
  ) { }

  getChats(userId: number): Observable<Conversation[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get<ResponseModel<Conversation[]>>(`${this.url}/GetChats`, {params}).pipe(
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

}
