import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'pantano-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
})
export class AnimationComponent implements OnInit, OnDestroy {
  @Input() animation;

  private $animationSubscription;
  public animationConfig = {
    correct: false,
    lose: false,
    fail: false,
    win: false,
    idle: true
  }

  constructor() { }

  ngOnInit(): void {
    this.$animationSubscription = this.animation.subscribe(change => {
      switch (change.event) {
        case 'correctAnswer':
          this.animationConfig.idle = false;
          this.animationConfig.correct = true;
          break;
        case 'wrongAnswer':
          this.animationConfig.idle = false;
          this.animationConfig.fail = true;
          break;
        case 'gameOver':
          this.animationConfig.idle = false;
          this.animationConfig.lose = true;
          break;
        case 'winGame':
          this.animationConfig.idle = false;
          this.animationConfig.win = true;
          break;
      }

      setTimeout(() => {
        this.animationConfig.idle = true;
        this.animationConfig.correct = false;
        this.animationConfig.fail = false;
      }, 2000);
    });
  }

  ngOnDestroy(): void {
    this.$animationSubscription.unsubscribe();
  }

}
