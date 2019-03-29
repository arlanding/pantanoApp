import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'pantano-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnInit, OnDestroy {
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
