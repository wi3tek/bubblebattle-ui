import { Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { AnswerData, TeamData } from 'src/app/model/game';
import { TimerComponent } from '../../timer/timer.component';
import { timer } from 'rxjs';
import { CommonFunctionsComponent } from '../../common/common-functions/common-functions.component';

@Component({
  selector: 'app-participant-question',
  templateUrl: './participant-question.component.html',
  styleUrls: ['./participant-question.component.css'],
})
export class ParticipantQuestionComponent extends CommonFunctionsComponent {
  // QUESTION
  // QUESTION_WITH_PROMPTS
  // QUESTION_WITH_ANSWER

  @Input() roundStage!: string;
  @Input() stakes!: number;
  @Input() questionWinner!: TeamData;
  @Input() roundNumber!: number;
  @ViewChild(TimerComponent) timerRef!: TimerComponent;

  timerSeconds = 0;

  answers: AnswerData[] = [];

  constructor(private changeDetection: ChangeDetectorRef, router: Router) {
    super(router);
  }

  ngAfterContentChecked() {
    this.changeDetection.detectChanges();
    // this.timerRef.start(60);
  }

  override ngOnInit() {
    if (this.questionWinner.activeQuestion) {
      this.answers = this.questionWinner.activeQuestion.answers;
    }
  }

  startTimer() {
    this.reload();
  }

  reload() {
    this.timerRef.audio.pause();
    this.reloadComponent(true);
  }

  canDisplayImage(): boolean {
    return (
      this.questionWinner.activeQuestion != null &&
      this.questionWinner.activeQuestion.imageUrl != null &&
      this.questionWinner.activeQuestion.imageUrl.length > 0
    );
  }

  canStartTimer(): boolean {
    var result = this.questionWinner.activeQuestion
      ? this.questionWinner.activeQuestion.startOnInit
      : false;
    return result;
  }
}
