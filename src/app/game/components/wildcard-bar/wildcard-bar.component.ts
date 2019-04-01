import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pantano-wildcard-bar',
  templateUrl: './wildcard-bar.component.html',
  styleUrls: ['./wildcard-bar.component.scss'],
})
export class WildcardBarComponent implements OnInit, OnDestroy {
  @Input() game;
  @Input() animation;
  @Output()
  event: EventEmitter<any> = new EventEmitter();

  private $gameSubscription;
  private $animationSubscription;
  public errorsCommitted = 0;
  public disableWildcard = true;
  public questionNumber = 0;
  public wildcardsRemaining = 1;
  public numberOfQuestions = 10;

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
      this.questionNumber = change.questionNumber;
      if (!change.wildcardApplied && !change.gameOver && !change.win) {
        this.disableWildcard = false;
      }
    });
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
    this.emit({ eventName: 'init' });
  }

  public applyWildcard() {
    this.emit({ eventName: 'wildcard' });
  }

  private emit(emition) {
    this.event.emit({ child: 'wildcard', ...emition });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
    this.$animationSubscription.unsubscribe();
  }

}
