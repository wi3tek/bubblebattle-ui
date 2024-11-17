import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { AnswerData, TeamData } from 'src/app/model/game';
import { TimerComponent } from '../../timer/timer.component';

@Component({
  selector: 'app-participant-question',
  templateUrl: './participant-question.component.html',
  styleUrls: ['./participant-question.component.css'],
})
export class ParticipantQuestionComponent {
  // QUESTION
  // QUESTION_WITH_PROMPTS
  // QUESTION_WITH_ANSWER

  @Input() roundStage!: string;
  @Input() stakes!: number;
  @Input() questionWinner!: TeamData;
  @Input() roundNumber!: number;
  @ViewChild(TimerComponent) timerRef!: TimerComponent;

  answers: AnswerData[] = [];

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngAfterContentChecked() {
    this.changeDetection.detectChanges();
    // this.timerRef.start(60);
  }

  ngOnInit() {
    if (this.questionWinner.activeQuestion) {
      this.answers = this.questionWinner.activeQuestion.answers;
    }
  }

  startTimer() {
    console.log('STARTED TIMER FROM ParticipantQuestionComponent');
    this.timerRef.start(60);
  }
}
