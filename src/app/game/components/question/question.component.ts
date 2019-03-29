import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pantano-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() game;

  private $questionSubscription;
  public question: string = '';
  public answer1 = '';
  public answer2 = '';

  constructor() { }

  ngOnInit() {
   debugger;
   this.$questionSubscription = this.game.subscribe( newQuestion => {
    debugger;
    this.renderQuestion(newQuestion);
   });
  }

  renderQuestion(question){
    this.question = question.quest;
    this.answer1 = question.ans;
    this.answer2 = 'fail '+ question.ans;
  }

}
