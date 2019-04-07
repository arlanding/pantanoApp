import { Injectable } from '@angular/core';
import { UserInfo } from '../interfaces/user-info';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private newUser = true;
  private userInfo: UserInfo = {
    userData: { nickname: '', email: '', instagram: '' },
    matches: { win: 0, lose: 0 }
  };

  constructor(private cookieService: CookieService) { }

  public isNewUser(): boolean {
    const cookieExists: boolean = this.cookieService.check('pantano-userData');
    if(this.newUser && cookieExists){
      this.userInfo = this.getUserInfoCookies();
      this.newUser = false;
    }
    return this.newUser;
  }

  public isFirstMatch(): boolean {
    return (this.userInfo.matches.win + this.userInfo.matches.lose) < 1;
  }

  public setUserInfo(config): void {
    this.newUser = false;
    this.userInfo.userData = config.userData;
    this.userInfo.matches.win = config.matches.win;
    this.userInfo.matches.lose = config.matches.lose;
    this.cookieService.set('pantano-userData', JSON.stringify(config.userData));
    this.cookieService.set('pantano-matches', JSON.stringify(config.matches));
  }

  public getUserInfo(): UserInfo {
    return this.userInfo;
  }

  private getUserInfoCookies(): UserInfo{
    const cookieUserData = JSON.parse(this.cookieService.get('pantano-userData'));
    const cookieMatches = JSON.parse(this.cookieService.get('pantano-matches'));
    const userDataFromCookies = {
      userData: cookieUserData,
      matches: cookieMatches
    };
    return userDataFromCookies;
  }

}
