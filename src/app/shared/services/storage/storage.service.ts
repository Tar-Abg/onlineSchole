import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setUserIdInLocalStorage(userId: number): void {
    localStorage.setItem('userId', JSON.stringify(userId))
  }

  getUserId(): number{
    const userId = localStorage.getItem('userId');
    if (userId) {
      return +userId;
    } else {
      return NaN;
    }
  }

  clearUserId(): void {
    localStorage.removeItem('userId');
  }

}
