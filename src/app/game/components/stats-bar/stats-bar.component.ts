import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'pantano-stats-bar',
  templateUrl: './stats-bar.component.html',
  styleUrls: ['./stats-bar.component.scss'],
})
export class StatsBarComponent implements OnInit, OnDestroy {
  @Input() game;

  private $gameSubscription;

  constructor() { }

  ngOnInit(): void {
   this.$gameSubscription = this.game.subscribe( change => {
   });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
  }
  
}
