import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'pantano-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {

  error = false;
  nick:string;

  constructor(private modalCtrl: ModalController) { }

  public confirmNickname(){
    if(this.nick && this.nick.length >= 3 && this.nick.length <= 8){
      this.modalCtrl.dismiss(this.nick)
    }else{
      this.error = true;
    }    
  }

}
