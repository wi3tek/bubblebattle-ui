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
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/model/game';
import { ParticipantGameService } from 'src/app/service/participant-game-service';
import { ParticipantQuestionComponent } from '../participant-question/participant-question.component';
import { BubblesCounterComponent } from '../../common/bubbles-counter/bubbles-counter.component';
import { ChangeBubblesAmountComponent } from '../../host/change-bubbles-amount/change-bubbles-amount.component';
import { CommonFunctionsComponent } from '../../common/common-functions/common-functions.component';

@Component({
  selector: 'app-init-participant-game',
  templateUrl: './init-participant-game.component.html',
  styleUrls: ['./init-participant-game.component.css'],
})
export class InitParticipantGameComponent extends CommonFunctionsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  game: Game | null = null;
  gameId: string;
  waitingForResult: boolean = false;
  gameStage: string = '';
  roundStage: string = '';
  @ViewChild(ParticipantQuestionComponent)
  participantQuestionRef!: ParticipantQuestionComponent;
  @ViewChild('bubblesCounterRef')
  bubblesCounterRef!: BubblesCounterComponent;
  counterEnabled = true;

  public constructor(
    router: Router,
    private initGameService: ParticipantGameService,
    private cd: ChangeDetectorRef
  ) {
    super(router);
    this.gameId = this.route.snapshot.params['gameId'];
  }

  override ngOnInit(): void {
    this.initGameService.initGame(this.gameId).subscribe({
      next: (response) => {
        this.game = response;
        this.gameStage = this.game.gameStage;
        this.roundStage = this.game.roundStage;
        if (this.game?.moneyUp) {
          this.moneyUpSound();
        }

        if (this.game.roundStage === 'AFTER_ANSWER') {
          this.playSound('../../../../assets/sounds/bubbles-counter.wav');
        }
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

        if (
          this.roundStage === 'QUESTION' ||
          this.roundStage === 'QUESTION_WITH_PROMPTS'
        ) {
          this.participantQuestionRef.startTimer();
          console.log('QUESTION PARTICIPANT', response);
        }

        if (this.roundStage === 'AFTER_ANSWER') {
          console.log('component reloaded');
          this.playSound('../../../../assets/sounds/bubbles-counter.wav');
          this.reloadComponent(true);
        }

        if (this.game?.moneyUp) {
          this.moneyUpSound();
        }
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
      },
    });
  }

  moneyUpSound() {
    this.playSound('../../../../assets/sounds/bubbles-up.wav');
  }

  playSound(src: string) {
    let audio = new Audio();
    audio.src = src;
    audio.load();
    audio.muted;
    audio.play();
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
