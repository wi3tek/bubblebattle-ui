import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChangeBubblesAmountRequest, TeamData } from 'src/app/model/game';

@Component({
  selector: 'app-change-bubbles-amount',
  templateUrl: './change-bubbles-amount.component.html',
  styleUrls: ['./change-bubbles-amount.component.css'],
})
export class ChangeBubblesAmountComponent {
  @Output() confirmBtn = new EventEmitter<ChangeBubblesAmountRequest>();
  @Output() cancelBtn = new EventEmitter<void>();
  @Input() teams!: TeamData[];
  selectedTeamColor: string = '';
  confirm(strValue: string) {
    var request: ChangeBubblesAmountRequest = {
      gameId: '',
      teamColor: this.selectedTeamColor,
      bubblesAmount: +strValue,
    };

    this.confirmBtn.emit(request);
  }
  cancel() {
    this.cancelBtn.emit();
  }

  chooseTeamColor(selectedTeamColor: string) {
    this.selectedTeamColor = selectedTeamColor;
    console.log(this.selectedTeamColor);
  }

  prepareTeamColor(teamColor: string): string {
    return teamColor === 'BLUE'
      ? 'NIEBIESCY'
      : teamColor === 'GREEN'
      ? 'ZIELONI'
      : teamColor === 'YELLOW'
      ? 'ŻÓŁCI'
      : teamColor === 'BLACK'
      ? 'MISTRZOWIE'
      : '';
  }
}
