import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pantano-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent {
  @Input() question;

  isAnswerVisible = false;

  constructor() { }

  public toggleAnswerVisibility(){
    this.isAnswerVisible = !this.isAnswerVisible;
  }

}
