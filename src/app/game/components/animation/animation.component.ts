import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'pantano-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
})
export class AnimationComponent implements OnInit, OnDestroy {
  @Input() game;

  private $gameSubscription;
  public animationConfig = {
    win: false,
    lose: false,
    fail: false,
    idle: true
  }

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
      switch (change.event) {
        case 'correctAnswer':
          this.animationConfig.idle = false;
          this.animationConfig.win = true;
          break;
        case 'wrongAnswer':
          this.animationConfig.idle = false;
          this.animationConfig.fail = true;
          break;
        case 'gameOver':
          this.animationConfig.idle = false;
          this.animationConfig.lose = true;
          break;
      }

      setTimeout(() => {
        this.animationConfig.idle = true;
        this.animationConfig.win = false;
        this.animationConfig.fail = false;
      }, 2000);
    });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
  }

}
