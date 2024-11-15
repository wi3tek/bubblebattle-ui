import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game, TeamData } from 'src/app/model/game';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
})
export class AuctionComponent {
  gameResponse: string | null = null;
  waitingForResult: boolean = false;

  @Input() game!: Game;
  @Input() gameId!: string;
  @Output() stakesRaised = new EventEmitter<void>();

  winnerColor: string = '';

  @Input() stakesTeam: TeamData = {
    teamColor: 'STAKES',
    bubbleAmount: 0,
    bubbleStakesAmount: 0,
    active: true,
    activeQuestion: null,
    highestStakes: false,
  };

  ngOnInit() {
    this.stakesTeam.bubbleAmount = this.game.bubbleStakes;
    this.winnerColor = this.game.auctionWinner.teamColor;
  }

  stakesRaisedInfo() {
    this.stakesRaised.emit();
  }
}
