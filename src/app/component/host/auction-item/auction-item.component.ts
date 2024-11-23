import { RaiseStakesRequest } from './../../../model/game';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TeamData } from 'src/app/model/game';
import { HostGameService } from 'src/app/service/host-game-service';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css'],
})
export class AuctionItemComponent {
  @Input() team!: TeamData;
  @Input() headerTitle: string = 'STAN BOMBELKÓW';
  @Input() auctionStage!: boolean;
  @Input() gameStakes!: number;
  @Input() gameId!: string;
  @Input() highestBidAmount!: number;
  @Input() winnerColor!: string;
  @Output() stakesRaised = new EventEmitter<void>();
  bidAmount: string = '';
  teamBlocked = false;

  teamStakesOptions: number[] = [];

  bidForm = new FormGroup({
    value: new FormControl(0),
  });

  constructor(private hostGameService: HostGameService) {}

  ngOnInit() {
    this.teamStakesOptions = [];
    var amount: number = this.highestBidAmount;

    for (let index = 0; index < 12; index++) {
      if (
        this.team.bubbleAmount === 0 ||
        this.team.bubbleAmount + this.team.bubbleStakesAmount <=
          this.highestBidAmount
      ) {
        this.teamBlocked = true;
        this.teamStakesOptions[index] = 0;
        continue;
      }

      if (index >= 0 && index <= 6) {
        amount = amount + 100;
        this.teamStakesOptions[index] = amount;
      }

      if (index > 6 && index <= 8) {
        amount = amount + 300;
        this.teamStakesOptions[index] = amount;
      }

      if (index > 8 && index <= 12) {
        amount = amount + 500;
        this.teamStakesOptions[index] = amount;
      }

      if (amount > this.team.bubbleAmount + this.team.bubbleStakesAmount) {
        this.teamStakesOptions[index] = 0;
      }
    }

    console.log(this.teamStakesOptions);
  }

  raiseTheStakes(amount: number, finalBid: boolean) {
    var request: RaiseStakesRequest = {
      gameId: this.gameId,
      teamColor: this.team.teamColor,
      bubblesAmount: roundHundred(amount),
      finalBid: finalBid,
    };
    this.hostGameService.raiseStakes(request).subscribe({
      next: () => {
        this.stakesRaised.emit();
        this.playSound('../../../../assets/sounds/retro/bubble-up.wav');
      },
    });
  }

  playSound(src: string) {
    let audio = new Audio();
    audio.src = src;
    audio.load();
    audio.muted;
    audio.play().catch((e) => console.log(e));
  }

  raiseCustomStakes(amount: string, finalBid: boolean) {
    this.raiseTheStakes(+amount, finalBid);
  }

  isWinner() {
    console.log(this.team.teamColor + this.team.bubbleStakesAmount);
    console.log('HIGHEST' + this.highestBidAmount);

    return (
      this.team.bubbleStakesAmount === this.highestBidAmount &&
      this.highestBidAmount >= 600
    );
  }
}

function roundHundred(value: number) {
  return Math.round(value / 100) * 100;
}
