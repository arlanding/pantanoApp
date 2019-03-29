import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pantano-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() game;
  @Output()
  event: EventEmitter<any> = new EventEmitter();

  private $gameSubscription;
  public question: string = '';
  public answer1 = '';
  public answer2 = '';

  constructor() { }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
      this.renderQuestion(change.gameQuestions[change.questionNumber - 1]);
    });
    this.event.emit({ init: true, child: 'question'});
  }

  renderQuestion(question) {
    this.question = question.quest;
    this.answer1 = question.ans;
    this.answer2 = 'fail ' + question.ans;
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
  }

}
