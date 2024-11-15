import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-giving-answer',
  templateUrl: './giving-answer.component.html',
  styleUrls: ['./giving-answer.component.css'],
})
export class GivingAnswerComponent {
  @Output() answeredCorrect = new EventEmitter<boolean>();

  wrongAnswer() {
    this.answeredCorrect.emit(false);
  }
  correctAnswer() {
    this.answeredCorrect.emit(true);
  }
}
