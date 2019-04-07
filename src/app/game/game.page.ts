import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { Subject, noop } from 'rxjs';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SessionService } from '../shared/services/session.service';
import { GameConfig } from '../shared/interfaces/game-config';
import { InvitePlayAgainComponent } from './components/invite-play-again/invite-play-again.component';
import { PopoverContentComponent } from '../shared/components/popover-content/popover-content.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  providers: [GameService, AlertController]
})
export class GamePage implements OnInit {

  private gameSubj: Subject<any> = new Subject();
  private animationSubj: Subject<any> = new Subject();
  private config: GameConfig = {
    gameOver: false,
    win: false,
    wildcardApplied: false,
    gameQuestions: [],
    userAnswers: [],
    qtyOfQuestions: 10,
    childsInitialized: 0,
    questionNumber: 1,
    errorsCommitted: 0,
    errorsAllowed: 2,
    matches: { win: 0, lose: 0 },
    userData: {
      nickname: '',
      email: '',
      instagram: ''
    }
  }
  public game$ = this.gameSubj.asObservable();
  public animation$ = this.animationSubj.asObservable();
  public start = false;

  constructor(
    private gameService: GameService,
    private modalController: ModalController,
    private sessionService: SessionService,
    private popoverController: PopoverController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.presentAlert();
  }

  async presentModal() {
    if (this.sessionService.isNewUser()) {
      const modal = await this.modalController.create({
        component: WelcomeComponent,
        backdropDismiss: false,
        keyboardClose: false,
        mode: 'ios',
        componentProps: { value: 123 }
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.config.userData.nickname = data.nickname;
      this.config.userData.email = data.email;
      this.config.userData.instagram = data.instagram;
      this.sessionService.setUserInfo(this.config);
      this.startNewGame();
    } else {
      const userInfo = this.sessionService.getUserInfo();
      this.config.userData.nickname = userInfo.userData.nickname;
      this.config.matches = userInfo.matches;
      this.startNewGame();
    }
  }

  async showTutorial(event): Promise<any> {
    if (this.sessionService.isFirstMatch()) {
      this.nofityChangeInGame('pauseGame');
      await this.presentPopover(event.message, event.$event, event.title);
      this.nofityChangeInGame('continueGame');
    }
  }

  async showMultipleTutorial(event): Promise<any> {
    if (this.sessionService.isFirstMatch()) {
      this.nofityChangeInGame('pauseGame');
      for (const tuto of event.tutorials) {
        await this.presentPopover(tuto.message, tuto.$event, tuto.title);
      }
      this.nofityChangeInGame('continueGame');
    }
  }

  async presentPopover(message, ev?: any, title: string = '', ) {
    const popover = await this.popoverController.create({
      component: PopoverContentComponent,
      event: ev,
      translucent: false,
      cssClass: 'custom-popover',
      backdropDismiss: false,
      keyboardClose: false,
      componentProps: {
        title: title,
        message: message
      }
    });
    await popover.present();
    return await popover.onDidDismiss();
  }

  private startNewGame() {
    this.gameService.getGame(this.config.qtyOfQuestions).subscribe(newGameQuestions => {
      this.setNewGameProperties(newGameQuestions);
    });
  }

  private setNewGameProperties(newGameQuestions) {
    this.config.gameOver = false;
    this.config.win = false;
    this.config.wildcardApplied = false;
    this.config.questionNumber = 1;
    this.config.gameQuestions = newGameQuestions;
    this.config.userAnswers = [];
    this.config.errorsCommitted = 0;
    this.start = true;
  }

  public childEvent(event) {
    switch (event.eventName) {
      case 'init':
        this.initChildEventReceived();
        break;
      case 'answer':
        this.answerReceived(event.correctAnswer, event.answer);
        break;
      case 'wildcard':
        this.wildcardApplied();
        break;
      case 'tutorial':
        this.showTutorial(event);
        break;
      case 'multipleTutorial':
        this.showMultipleTutorial(event);
        break;
    }
  }

  private answerReceived(correctAnswer: boolean, userAnswer) {
    this.nofityChangeInGame('tutorial');
    if (this.config.gameOver || this.config.win) { return false; }
    this.config.userAnswers.push(userAnswer);
    correctAnswer ? this.correctAnswerCommited() : this.newErrorCommited();
  }

  private correctAnswerCommited() {
    if (this.config.questionNumber === this.config.gameQuestions.questions.length) {
      return this.winCommited();
    }
    this.config.questionNumber++;
    this.nofityChangeInGame('correctAnswer');
  }

  private newErrorCommited() {
    this.config.errorsCommitted++;
    if (this.config.errorsCommitted === this.config.errorsAllowed) {
      return this.loseCommited();
    } else {
      this.config.questionNumber++;
      this.nofityChangeInGame('wrongAnswer');
    };
  }

  private winCommited() {
    this.config.win = true;
    this.config.matches.win++;
    this.nofityChangeInGame('winGame');
    this.endMatch();
  }

  private loseCommited() {
    this.config.gameOver = true;
    this.config.matches.lose++;
    this.nofityChangeInGame('gameOver');
    this.endMatch();
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
    setTimeout(() => {
      this.gameSubj.next(change);
    }, 2600);
  }

  private endMatch() {
    this.gameService.postUserMatchData(this.config).subscribe(noop);
    this.sessionService.setUserInfo(this.config);
    setTimeout(() => {
      this.start = false;
      this.invitePlayAgain();
    }, 3000)
  }

  async invitePlayAgain() {
    const userMatchInfo = {
      win: this.config.win,
      lose: this.config.gameOver,
      matches: this.config.matches,
      nickname: this.config.userData.nickname,
      wildcardApplied: this.config.wildcardApplied
    }
    const modal = await this.modalController.create({
      component: InvitePlayAgainComponent,
      backdropDismiss: false,
      keyboardClose: false,
      mode: 'ios',
      componentProps: { matchInfo: userMatchInfo }
    });
    modal.present();
    await modal.onDidDismiss();
    this.startNewGame();
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
            this.presentModal();
          }
        }
      ]
    });

    await alert.present();
  }

}
