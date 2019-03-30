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

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
      if (!change.wildcardApplied && !change.gameOver) {
        this.disableWildcard = false;
      }
    });
    this.$animationSubscription = this.animation.subscribe(change => {
      this.disableWildcard = true;
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
    this.$animationSubscription.unsubscribe();
  }

}
