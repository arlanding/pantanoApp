import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  private newUser = true;
  private userInfo = {
    nickname: '',
    matches: { win: 0, lose: 0}
  };

  constructor() { }

  public isNewUser():boolean {
    return this.newUser;
  }

  public setUserInfo(config):void {
    this.newUser = false;
    this.userInfo.nickname = config.nickname;
    this.userInfo.matches = config.matches;
  }

  public getUserInfo():{ nickname: string, matches: { win: number, lose: number }}{
    return this.userInfo;
  }

}
