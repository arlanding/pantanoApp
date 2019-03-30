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
import { WildcardBarComponent } from './components/wildcard-bar/wildcard-bar.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

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
  declarations: [
    GamePage, 
    QuestionComponent, 
    AnimationComponent, 
    StatsBarComponent, 
    TimerComponent, 
    WildcardBarComponent, 
    TitleBarComponent,
    WelcomeComponent
  ],
  entryComponents:[
    WelcomeComponent
  ]
})
export class GamePageModule { }
