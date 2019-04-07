import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'pantano-invite-play-again',
  templateUrl: './invite-play-again.component.html',
  styleUrls: ['./invite-play-again.component.scss'],
})
export class InvitePlayAgainComponent implements OnInit {
  @Input() matchInfo;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  playAgain() {
    this.modalCtrl.dismiss(true);
  }
  
  backHome() {
    this.modalCtrl.dismiss(false);
  }

}
