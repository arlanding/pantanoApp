import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'pantano-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnInit, OnDestroy {
  @Input() game;

  private $gameSubscription;
  public nickname: string;
  public stats = false;
  public matches: {};

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
      if (change.event === 'startGame') {
        this.nickname = change.userData.nickname;
        if(change.matches.win > 0 || change.matches.lose > 0){
          this.stats = true;
          this.matches = change.matches;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
  }

}
