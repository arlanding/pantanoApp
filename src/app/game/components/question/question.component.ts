import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pantano-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() game;
  @Input() animation;
  @Output()
  event: EventEmitter<any> = new EventEmitter();

  private $gameSubscription;
  private $animationSubscription;
  private idQuest: number;
  public correctAnswerPosition: number;
  public question: string = '';
  public answers = ['', '']
  public disabled = true;
  public wildcardApplied = false;

  private questionConfig = {
    correctAnswer: ''
  }

  constructor() {

  }

  ngOnInit(): void {
    this.$animationSubscription = this.animation.subscribe(change => {
      if(change.event === 'wildcard'){
        this.wildcard();
      }
    });
    this.$gameSubscription = this.game.subscribe(change => {
      if (change.event !== 'gameOver' && change.event !== 'wildcard' && change.event !== 'winGame') {
        this.renderQuestion(change.gameQuestions.questions[change.questionNumber - 1]);
      }
      if(change.lose || change.win){
        this.disabled = true;
      }
    });
    this.emit({ eventName: 'init' });
  }

  public answerQuestion(userAnswer, position) {
    this.disabled = true;
    const answeredQuestion = { number: this.idQuest, user_ans: this.answers[position] }
    const correctAnswerEmmiter = { eventName: 'answer', correctAnswer: true, answer: answeredQuestion };
    const incorrectAnswerEmmiter = { eventName: 'answer', correctAnswer: false, answer: answeredQuestion };
    // Check answer and emmit result
    userAnswer === this.questionConfig.correctAnswer ? this.emit(correctAnswerEmmiter) : this.emit(incorrectAnswerEmmiter);
  }

  private renderQuestion(question) {
    this.idQuest = question.number;
    // Save correct answer in config
    this.questionConfig.correctAnswer = question.answer;
    // Assign received question for render
    this.question = question.question;
    // Get incorrect random answer
    const incorrectAnswer = this.getRandomIncorrect(question.wrong_answers);
    // Get random answers positions
    let indexAnswers = [0, 1]
    indexAnswers = this.getRandomOrder(indexAnswers);
    this.correctAnswerPosition = indexAnswers[0];
    // Assign received answers for render
    this.answers[indexAnswers[0]] = question.answer;
    this.answers[indexAnswers[1]] = incorrectAnswer;
    // able buttons
    this.disabled = false;
  }

  private getRandomIncorrect(incArr): string{
    return incArr[Math.floor(Math.random() * incArr.length)];
  }

  private wildcard(){
    this.wildcardApplied = true;
    setTimeout(()=>{
      this.wildcardApplied = false;
    },1000);

  }

  private emit(emition) {
    this.event.emit({ child: 'question', ...emition });
  }

  ngOnDestroy(): void {
    this.$gameSubscription.unsubscribe();
    this.$animationSubscription.unsubscribe();
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
