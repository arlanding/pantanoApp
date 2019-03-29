import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  providers: [ GameService, AlertController ]
})
export class GamePage implements OnInit {

  private newGameSubj: Subject<boolean> = new Subject();
  public game$ = this.newGameSubj.asObservable();

  constructor(private gameService: GameService, public alertController: AlertController) { }

  ngOnInit() {
    this.gameService.getGame().subscribe( gameQuestions => {
      // this.presentAlert();
      this.startNewGame(gameQuestions);
    });
  }
  
/*   async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  } */
  

  private startNewGame(questions){
    console.log(questions);
    setTimeout(()=>{
      this.nofityNewGame(questions[0]);
    }, 3000);
  }

  private nofityNewGame(newQuestion){
    debugger;
    this.newGameSubj.next(newQuestion);    
  }

}
