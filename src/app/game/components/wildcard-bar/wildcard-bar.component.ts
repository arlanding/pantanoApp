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

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
    });
    this.event.emit({ init: true, child: 'wildcard' });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
  }

}
