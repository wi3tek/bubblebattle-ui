import { Component, Input } from '@angular/core';
import { TeamData, AnswerData } from 'src/app/model/game';

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

  answers: AnswerData[] = [];

  ngOnInit() {
    console.log(this.questionWinner.activeQuestion);

    if (this.questionWinner.activeQuestion) {
      this.answers = this.questionWinner.activeQuestion.answers;
    }
  }
}
