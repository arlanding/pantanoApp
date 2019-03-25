import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuestionsPage } from './questions.page';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionsPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)    
  ],
  declarations: [QuestionsPage, QuestionCardComponent]
})
export class QuestionsPageModule {}
