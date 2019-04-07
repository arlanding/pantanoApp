import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'pantano-wildcard-bar',
  templateUrl: './wildcard-bar.component.html',
  styleUrls: ['./wildcard-bar.component.scss'],
})
export class WildcardBarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wildcard', { read: ElementRef }) wildcard: ElementRef;
  @ViewChild('errors', { read: ElementRef }) errors: ElementRef;

  @Input() game;
  @Input() animation;
  @Output()
  event: EventEmitter<any> = new EventEmitter();

  private $gameSubscription;
  private $animationSubscription;
  private wildcardTutorial = false;
  private errorsTutorial = false;
  public errorsCommitted = 0;
  public disableWildcard = true;
  public questionNumber = 0;
  public wildcardsRemaining = 1;
  public numberOfQuestions = 10;

  tutorials = [];

  constructor() { }

  ngAfterViewInit() {
    this.disableWildcard = true;
    this.errors.nativeElement.click();
    this.wildcard.nativeElement.click();
  }

  ngOnInit(): void {
    this.$animationSubscription = this.animation.subscribe(change => {
      this.disableWildcard = true;
      switch (change.event) {
        case 'wildcard':
          this.disableWildcard = change.wildcardApplied;
          this.wildcardsRemaining--;
          break;
        case 'startGame':
          this.numberOfQuestions = change.qtyOfQuestions;
          break;
        case 'wrongAnswer':
          this.errorsCommitted = change.errorsCommitted;
          break;
        case 'gameOver':
          this.errorsCommitted = change.errorsCommitted;
          break;
      }
    });
    this.$gameSubscription = this.game.subscribe(change => {
      switch (change.event) {
        case 'wildcard':
          break;
        case 'startGame':
          break;
        case 'wrongAnswer':
          break;
        case 'gameOver':
          break;
        case 'winGame':
          break;
        case 'pauseGame':
          break;
        default:
          if (!change.wildcardApplied) {
            this.disableWildcard = false;
          }
      }
      this.questionNumber = change.questionNumber;
    });
    this.emit({ eventName: 'init' });
  }

  public applyWildcard(event) {
    if (!this.wildcardTutorial) {
      this.wildcardTutorial = true;
      this.emitTutorials({$event: event, message: 'Este comodín te permitirá saber cuál es la respuesta correcta. ¡Solo tenes uno!', title: 'Comodín' });
    } else {
      this.emit({ eventName: 'wildcard' });
    }
  }

  private emitTutorials(tutorial){
    this.tutorials.push(tutorial)
    if(this.tutorials.length === 2){
      this.emit({ eventName: 'multipleTutorial', tutorials: this.tutorials });
    }
  }

  public errorsTutorialFn(event){
    if (!this.errorsTutorial) {
      this.errorsTutorial = true;
      this.emitTutorials({$event: event, message: 'Solo tenes dos vidas, cuidalas bien', title: 'Vidas' });
    }
  }

  private emit(emition) {
    this.event.emit({ child: 'wildcard', ...emition });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
    this.$animationSubscription.unsubscribe();
  }

}
