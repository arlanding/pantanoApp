import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pantano-wildcard-bar',
  templateUrl: './wildcard-bar.component.html',
  styleUrls: ['./wildcard-bar.component.scss'],
})
export class WildcardBarComponent implements OnInit, OnDestroy {
  @Input() game;
  @Output()
  event: EventEmitter<any> = new EventEmitter();

  private $gameSubscription;
  public errorsCommitted = 0;

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
      if(change.event === 'wrongAnswer' || change.event === 'gameOver'){
        this.errorsCommitted = change.errorsCommitted;
      }
    });
    this.emit({ eventName: 'init' });
  }

  private emit(emition){
    this.event.emit({ child: 'wildcard', ...emition});
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
  }

}
