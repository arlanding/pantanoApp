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
  public disableWildcard = false;

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
      switch (change.event) {
        case 'wildcard':
          this.disableWildcard = change.wildcardApplied;
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
  }

}
