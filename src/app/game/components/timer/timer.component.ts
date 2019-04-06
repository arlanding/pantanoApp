import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pantano-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() game;
  @Input() animation;
  @Output()
  event: EventEmitter<any> = new EventEmitter();

  private $gameSubscription;
  private $animationSubscription;
  private interval;
  private pause = false;
  public timePct = 1.0;

  constructor() { }

  ngOnInit(): void {
    this.$animationSubscription = this.animation.subscribe(change => {
      switch (change.event) {
        case 'wildcard':
          this.resetTimePct();
          break;
        case 'pauseGame':
          this.pause = true;
          if (this.interval) clearInterval(this.interval);
          break;
        default:
          if (this.interval) clearInterval(this.interval);
          break;
      }
    });
    this.$gameSubscription = this.game.subscribe(change => {
      switch (change.event) {
        case 'wildcard':
          break;
        case 'pauseGame':
          break;
        case 'gameOver':
          break;
        case 'winGame':
          break;
        case 'continueGame': {
          this.pause = false;
          if (this.interval) clearInterval(this.interval);
          if (!this.pause) { this.restartTimer() }
          break;
        }
        default:
          if (this.interval) clearInterval(this.interval);
          if (!this.pause) { this.restartTimer() }
          break;
      }
    });
    this.emit({ eventName: 'init' });
  }

  private restartTimer() {
    this.resetTimePct();
    this.interval = setInterval(() => {
      this.timePct = this.timePct - 0.01;
      if (this.timePct < 0) {
        const incorrectAnswerEmmiter = { eventName: 'answer', correctAnswer: false, answer: undefined };
        return this.emit(incorrectAnswerEmmiter)
      }
    }
      , 100);
  }

  private resetTimePct() {
    this.timePct = 1.1;
  }

  private emit(emition) {
    this.event.emit({ child: 'timer', ...emition });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
    this.$animationSubscription.unsubscribe();
  }

}
