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
    this.event.emit({ init: true, child: 'timer' });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
  }

}
