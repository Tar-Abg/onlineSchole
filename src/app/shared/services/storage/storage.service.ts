import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setUserIdInLocalStorage(userId: number): void {
    localStorage.setItem('userId', JSON.stringify(userId))
  }

  setUserType(type: number): void {
    localStorage.setItem('userType', JSON.stringify(type))
  }

  getUserId(): number{
    const userId = localStorage.getItem('userId');
    if (userId) {
      return +userId;
    } else {
      return NaN;
    }
  }

  getUserType(): number{
    const userType = localStorage.getItem('userType');
    if (userType) {
      return +userType;
    } else {
      return NaN;
    }
  }

  clearUserId(): void {
    localStorage.removeItem('userId');
  }

  clearUserType(): void {
    localStorage.removeItem('userType');
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(keyName: string): any {
    return localStorage.getItem(keyName);
  }
}
