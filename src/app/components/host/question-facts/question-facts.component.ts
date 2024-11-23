import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-facts',
  templateUrl: './question-facts.component.html',
  styleUrls: ['./question-facts.component.css'],
})
export class QuestionFactsComponent {
  @Input() hostFacts!: string | null;
}
