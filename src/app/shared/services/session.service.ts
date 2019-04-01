import { Injectable } from '@angular/core';
import { UserInfo } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private newUser = true;
  private userInfo: UserInfo = {
    userData: { nickname: '', email: '', instagram: '' },
    matches: { win: 0, lose: 0 }
  };

  constructor() { }

  public isNewUser(): boolean {
    return this.newUser;
  }

  public setUserInfo(config): void {
    this.newUser = false;
    this.userInfo.userData = config.userData;
    this.userInfo.matches.win = config.matches.win;
    this.userInfo.matches.lose = config.matches.lose;
  }

  public getUserInfo(): UserInfo {
    return this.userInfo;
  }

}
