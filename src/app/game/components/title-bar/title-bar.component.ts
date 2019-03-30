import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'pantano-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnInit, OnDestroy {
  @Input() game;

  private $gameSubscription;
  public questionNumber = 0;

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
      if (change.event !== 'gameOver') {
        this.questionNumber = change.questionNumber;
      }
    });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
  }

}
