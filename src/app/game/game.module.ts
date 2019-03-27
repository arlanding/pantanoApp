import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GamePage } from './game.page';
import { SharedModule } from '../shared/shared.module';
import { QuestionComponent } from './components/question/question.component';
import { AnimationComponent } from './components/animation/animation.component';
import { StatsBarComponent } from './components/stats-bar/stats-bar.component';
import { TimerComponent } from './components/timer/timer.component';

const routes: Routes = [
  {
    path: '',
    component: GamePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GamePage, QuestionComponent, AnimationComponent, StatsBarComponent, TimerComponent]
})
export class GamePageModule { }
