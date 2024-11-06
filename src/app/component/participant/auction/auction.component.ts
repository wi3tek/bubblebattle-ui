import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, TeamData } from 'src/app/model/game';
import { ParticipantGameService } from 'src/app/service/participant-game-service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
})
export class AuctionComponent {
  gameResponse: string | null = null;
  waitingForResult: boolean = false;

  @Input() game!: Game;

  stakesTeam: TeamData = {
    teamColor: 'STAKES',
    bubbleAmount: 0,
    bubbleStakesAmount: 0,
    active: true,
    activeQuestion: null,
    highestStakes: false,
  };
}
