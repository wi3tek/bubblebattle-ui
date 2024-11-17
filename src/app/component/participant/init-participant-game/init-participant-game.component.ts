import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/model/game';
import { ParticipantGameService } from 'src/app/service/participant-game-service';
import { ParticipantQuestionComponent } from '../participant-question/participant-question.component';
import { BubblesCounterComponent } from '../../common/bubbles-counter/bubbles-counter.component';
import { ChangeBubblesAmountComponent } from '../../host/change-bubbles-amount/change-bubbles-amount.component';

@Component({
  selector: 'app-init-participant-game',
  templateUrl: './init-participant-game.component.html',
  styleUrls: ['./init-participant-game.component.css'],
})
export class InitParticipantGameComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  game: Game | null = null;
  gameId: string;
  waitingForResult: boolean = false;
  gameStage: string = '';
  roundStage: string = '';
  @ViewChild(ParticipantQuestionComponent)
  participantQuestionRef!: ParticipantQuestionComponent;
  counterEnabled = true;

  public constructor(
    private initGameService: ParticipantGameService,
    private cd: ChangeDetectorRef
  ) {
    this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit(): void {
    this.initGameService.initGame(this.gameId).subscribe({
      next: (response) => {
        this.game = response;
        this.gameStage = this.game.gameStage;
        this.roundStage = this.game.roundStage;
      },
    });

    this.initGameService.subscribeParticipantGame(this.gameId).subscribe({
      next: (response) => {
        this.waitingForResult = false;

        this.game = JSON.parse(response);
        console.log(
          `received game, id=${this.game?.gameId}, roundStage=${this.game?.roundStage}`
        );
        this.gameStage = this.game ? this.game.gameStage : this.gameStage;
        this.roundStage = this.game ? this.game.roundStage : this.roundStage;

        this.cd.detectChanges();
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAuctionWinnerColor(): string {
    if (this.game) {
      return this.game.auctionWinner.teamColor;
    }

    return '';
  }
  isAnsweredCorrect(): boolean {
    if (this.game && this.game.auctionWinner.activeQuestion) {
      return this.game.auctionWinner.activeQuestion.answeredCorrect;
    }
    return false;
  }
}
