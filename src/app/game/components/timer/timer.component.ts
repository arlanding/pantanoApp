import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pantano-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() game;
  @Output()
  event: EventEmitter<any> = new EventEmitter();

  private $gameSubscription;
  private interval;
  public timePct = 1.0;

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
      switch (change.event) {
        case 'gameOver':
          if (this.interval) clearInterval(this.interval);
          break;
        case 'wildcard':
          this.resetTimePct();
          break;
        default:
          if (this.interval) clearInterval(this.interval);
          setTimeout(() => {
            this.restartTimer()
          }, 2600);
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
        const incorrectAnswerEmmiter = { eventName: 'answer', correctAnswer: false };
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
  }

}
