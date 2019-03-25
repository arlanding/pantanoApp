import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GamePage } from './game.page';
import { SharedModule } from '../shared/shared.module';

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
  declarations: [GamePage]
})
export class GamePageModule {}
