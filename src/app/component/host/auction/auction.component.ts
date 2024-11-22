import { ReverseRestoreAuctionRequest } from './../../../model/game';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game, TeamData } from 'src/app/model/game';
import { HostGameService } from 'src/app/service/host-game-service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
})
export class AuctionComponent {
  gameResponse: string | null = null;
  waitingForResult: boolean = false;

  constructor(private hostGameService: HostGameService) {}

  @Input() game!: Game;
  @Input() gameId!: string;
  @Output() stakesRaised = new EventEmitter<void>();
  @Output() auctionHistoryChange = new EventEmitter<string>();
  @Input() possibleForward = false;
  @Input() possibleBackward = false;
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
  }

  stakesRaisedInfo() {
    this.stakesRaised.emit();
  }

  backwardAuction() {
    console.log('Auction reversed');
    this.auctionHistoryChange.emit('BACKWARD');
  }
  forwardAuction() {
    console.log('Auction restored ');
    this.auctionHistoryChange.emit('FORWARD');
  }
}
