import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SessionService } from './shared/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Jugar (Beta)',
      url: '/jugar',
      icon: 'planet'
    },
    {
      title: 'Practicar',
      url: '/practicar',
      icon: 'list'
    }
  ];
  public showCookieMessage = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sessionService: SessionService
  ) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.showCookieMessage = !this.sessionService.checkCookie('pantano-cookie-accept');
  }

  public acceptCookies(){
    this.sessionService.setCookie('pantano-cookie-accept', 'accept');
    this.showCookieMessage = false;
  }
}
