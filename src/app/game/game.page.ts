import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';

export interface GameConfigInterface {
  start: boolean,
  gameOver: boolean,
  wildcardApplied: boolean
  gameQuestions: any,
  childsInitialized: number,
  questionNumber: number,
  errorsCommitted: number,
  errorsAllowed: number,
  matches: { win:number, lose:number }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  providers: [GameService, AlertController]
})
export class GamePage implements OnInit {

  private gameSubj: Subject<any> = new Subject();
  private animationSubj: Subject<any> = new Subject();
  private config: GameConfigInterface = {
    start: false,
    gameOver: false,
    wildcardApplied: false,
    gameQuestions: [],
    childsInitialized: 0,
    questionNumber: 1,
    errorsCommitted: 0,
    errorsAllowed: 2,
    matches: { win: 0, lose: 0 }
  }
  public game$ = this.gameSubj.asObservable();
  public animation$ = this.animationSubj.asObservable();

  constructor(private gameService: GameService, public alertController: AlertController) { }

  ngOnInit() {
    this.presentAlert();
  }

  private startNewGame() {
    this.gameService.getGame().subscribe(newGameQuestions => {
      this.setNewGameProperties(newGameQuestions);
    });
  }

  private setNewGameProperties(newGameQuestions) {
    this.config.start = true;
    this.config.gameOver = false;
    this.config.wildcardApplied = false;
    this.config.questionNumber = 1;
    this.config.gameQuestions = newGameQuestions;
    this.config.errorsCommitted = 0;
  }

  public childEvent(event) {

    switch (event.eventName) {
      case 'init':
        this.initChildEventReceived();
        break;
      case 'answer':
        this.answerReceived(event.correctAnswer);
        break;
      case 'wildcard':
        this.wildcardApplied();
    }

  }

  private answerReceived(correctAnswer: boolean) {
    if (this.config.gameOver) { return false; }
    this.config.questionNumber++;
    correctAnswer ? this.correctAnswerCommited() : this.newErrorCommited();
  }

  private correctAnswerCommited() {
    this.nofityChangeInGame('correctAnswer');
  }

  private newErrorCommited() {
    this.config.errorsCommitted++;
    if (this.config.errorsCommitted === this.config.errorsAllowed) {
      this.config.gameOver = true;
      this.nofityChangeInGame('gameOver')
    } else {
      this.nofityChangeInGame('wrongAnswer');
    };
  }

  private wildcardApplied() {
    if (!this.config.wildcardApplied) {
      this.config.wildcardApplied = true;
      this.nofityChangeInGame('wildcard');
    }
  }

  private nofityChangeInGame(event?: string): void {
    const change = { event: event, ...this.config }
    this.animationSubj.next(change);
    // Wait 2600 miliseconds making fluid game sense
    setTimeout(()=>{
      this.gameSubj.next(change);
    },2600);
  }

  private initChildEventReceived() {
    this.config.childsInitialized++;
    if (this.config.childsInitialized >= 3) {
      this.nofityChangeInGame('startGame');
    }
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Juego versión Beta',
      message: 'Esta es una versión de prueba del juego. Pronto estará la versión completa',
      backdropDismiss: false,      
      buttons: [
        {
          text: 'Empezar',
          role: 'comenzar',
          handler: () => {
            this.startNewGame();
          }
        }
      ]
    });

    await alert.present();
  }

}
