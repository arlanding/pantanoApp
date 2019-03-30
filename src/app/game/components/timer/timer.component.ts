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

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
    });
    this.emit({ eventName: 'init' });
  }

  private emit(emition){
    this.event.emit({ child: 'timer', ...emition});
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
  }

}
