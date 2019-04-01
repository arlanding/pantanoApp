import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserData } from 'src/app/shared/interfaces/user-data';

@Component({
  selector: 'pantano-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {

  error = false;
  public userData: UserData = {
    nickname: '',
    email: '',
    instagram: ''
  }

  constructor(private modalCtrl: ModalController) { }

  public confirmNickname(){
    if(this.userData.nickname && this.userData.nickname.length >= 3 && this.userData.nickname.length <= 8){
      this.modalCtrl.dismiss(this.userData)
    }else{
      this.error = true;
    }    
  }

}
