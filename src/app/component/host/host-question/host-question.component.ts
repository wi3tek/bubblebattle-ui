import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { TeamData, AnswerData, QuestionData } from 'src/app/model/game';
import { TimerComponent } from '../../timer/timer.component';

@Component({
  selector: 'app-host-question',
  templateUrl: './host-question.component.html',
  styleUrls: ['./host-question.component.css'],
})
export class HostQuestionComponent {
  // QUESTION
  // QUESTION_WITH_PROMPTS
  // QUESTION_WITH_ANSWER

  @Input() roundStage!: string;
  @Input() stakes!: number;
  @Input() questionWinner!: TeamData;
  @Input() roundNumber!: number;
  @Output() emitSeconds = new EventEmitter<number>();
  @ViewChild('timerRef') timerRef!: TimerComponent;
  answers: AnswerData[] = [];
  secondsAgo: number = 0;

  ngOnInit() {
    console.log(this.questionWinner.activeQuestion);

    if (this.questionWinner.activeQuestion) {
      this.answers = this.questionWinner.activeQuestion.answers;
    }
  }

  prepareSeconds(): number {
    return this.questionWinner.activeQuestion
      ? this.questionWinner.activeQuestion.remainingTimeSec
      : 0;
  }

  canStartTimer(): boolean {
    var result = this.questionWinner.activeQuestion
      ? this.questionWinner.activeQuestion.startOnInit
      : false;
    return result;
  }

  public startClock(seconds: number) {
    this.timerRef.start(seconds);
  }

  canDisplayImage(): boolean {
    return (
      this.questionWinner.activeQuestion != null &&
      this.questionWinner.activeQuestion.imageUrl != null &&
      this.questionWinner.activeQuestion.imageUrl.length > 0
    );
  }

  takeSec(sec: number) {
    console.log('TIMER ', sec);
    this.secondsAgo = sec / 1000;
  }

  updateQuestion(auctionWinner: TeamData | null) {
    if (auctionWinner === null) {
      return;
    }

    this.questionWinner = auctionWinner;
  }
}
