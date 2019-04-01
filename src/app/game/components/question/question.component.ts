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
  public answers = ['', '']
  public disabled = true;

  private questionConfig = {
    correctAnswer: ''
  }

  constructor() {

  }

  ngOnInit(): void {
    this.$gameSubscription = this.game.subscribe(change => {
      if (change.event !== 'gameOver' && change.event !== 'wildcard' && change.event !== 'winGame') {
        this.renderQuestion(change.gameQuestions[change.questionNumber - 1]);
      }
      if(change.lose || change.win){
        this.disabled = true;
      }
    });
    this.emit({ eventName: 'init' });
  }

  public answerQuestion(userAnswer) {
    this.disabled = true;
    const correctAnswerEmmiter = { eventName: 'answer', correctAnswer: true };
    const incorrectAnswerEmmiter = { eventName: 'answer', correctAnswer: false };
    // Check answer and emmit result
    userAnswer === this.questionConfig.correctAnswer ? this.emit(correctAnswerEmmiter) : this.emit(incorrectAnswerEmmiter);
  }

  private renderQuestion(question) {
    // Save correct answer in config
    this.questionConfig.correctAnswer = question.ans;
    // Assign received question for render
    this.question = question.quest;
    // Get random answers positions
    let indexAnswers = [0, 1]
    indexAnswers = this.getRandomOrder(indexAnswers);
    // Assign received answers for render
    this.answers[indexAnswers[0]] = question.ans;
    this.answers[indexAnswers[1]] = 'fail: ' + question.ans;
    // able buttons
    this.disabled = false;
  }

  private emit(emition) {
    this.event.emit({ child: 'question', ...emition });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
  }

  private getRandomOrder(array) {
    var tmp, current, top = array.length;
    if (top) while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }

}
