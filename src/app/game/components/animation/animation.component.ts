import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'pantano-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
})
export class AnimationComponent implements OnInit, OnDestroy {
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
