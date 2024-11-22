import { HostQuestionComponent } from './../host-question/host-question.component';
import {
  Action,
  CategoryData,
  ChangeBubblesAmountRequest,
  HostAction,
  PerformActionRequest,
  ReverseRestoreAuctionRequest,
  TeamData,
} from './../../../model/game';
import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/model/game';
import { HostGameService } from 'src/app/service/host-game-service';

@Component({
  selector: 'app-init-host-game',
  templateUrl: './init-host-game.component.html',
  styleUrls: ['./init-host-game.component.css'],
})
export class InitHostGameComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  game: Game | null = null;
  gameId: string;
  bubbleStakes: number = 0;
  winnerColor: string = '';
  sellAnswersMode: boolean = false;
  categorySelectionMode: boolean = false;
  givingAnswerMode: boolean = false;
  actions: HostAction[] = [];
  categories: CategoryData[] = [];
  changeBubblesAmountMode: boolean = false;
  possibleForward: boolean = false;
  possibleBackward: boolean = false;
  // auctionWinner: TeamData | null = null;

  @ViewChild('hostQuestionRef') hostQuestionRef!: HostQuestionComponent;

  constructor(private gameService: HostGameService) {
    this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit() {
    this.initGame();
  }

  initGame(): void {
    this.gameService.initGame(this.gameId).subscribe({
      next: (response) => {
        this.updateContent(response);
      },
    });
  }

  startStopQuestionTimer(seconds: number | null, start: boolean): void {
    var request: PerformActionRequest = {
      gameId: this.gameId,
      action: Action.START_STOP_QUESTION_TIMER,
      category: null,
      price: null,
      teamColor: null,
      answer: null,
      secondsRemaining: seconds,
      start: start,
    };

    this.performActionCall(request);

    console.log('seconds timer', request);
  }

  performAction(hostAction: HostAction) {
    if (hostAction.action === Action.SELL_ANSWERS) {
      this.sellAnswersMode = true;
      this.changeBubblesAmountMode = false;
      this.hostQuestionRef.timerRef.stop();
      this.startStopQuestionTimer(this.hostQuestionRef.secondsAgo, false);
      return;
    }

    if (hostAction.action === Action.CHOOSE_CATEGORY) {
      this.categorySelectionMode = true;
      return;
    }

    if (hostAction.action === Action.ANSWER_THE_QUESTION) {
      this.startStopQuestionTimer(0, false);
      this.givingAnswerMode = true;
      return;
    }

    var request: PerformActionRequest = {
      gameId: this.gameId,
      action: hostAction.action,
      category: null,
      price: null,
      teamColor: null,
      answer: null,
      start: null,
      secondsRemaining: null,
    };

    this.performActionCall(request);
  }
  performActionCall(request: PerformActionRequest) {
    this.gameService.performAction(request).subscribe({
      next: (response) => {
        this.updateContent(response);
      },
    });
  }

  initBubbles() {
    var request: PerformActionRequest = {
      gameId: this.gameId,
      action: Action.INIT_BUBBLES,
      category: null,
      price: null,
      teamColor: null,
      answer: null,
      start: null,
      secondsRemaining: null,
    };

    this.performActionCall(request);
  }

  updateContent(response: Game): void {
    this.game = response;
    this.actions = this.game.hostActions;

    if (this.game) {
      this.categories = this.game.categoryList;
      this.bubbleStakes = this.game.bubbleStakes;
      this.winnerColor = this.game.auctionWinner?.teamColor;
      this.possibleBackward =
        this.game.roundStage === 'AUCTION' && this.game.possibleBackward;
      this.possibleForward =
        this.game.roundStage === 'AUCTION' && this.game.possibleForward;

      if (
        this.game.roundStage === 'QUESTION' ||
        this.game.roundStage === 'QUESTION_WITH_PROMPTS'
      ) {
        var winner = this.game.auctionWinner;
        let question = winner.activeQuestion;
        if (question && question.startOnInit) {
          this.hostQuestionRef.startClock(question.remainingTimeSec);
        } else {
          this.hostQuestionRef.timerRef.stop();
        }
      }
    }
  }

  takeChosenCategory(category: string) {
    console.log(category.toString());

    var request: PerformActionRequest = {
      gameId: this.gameId,
      action: Action.CHOOSE_CATEGORY,
      category: category,
      price: null,
      teamColor: null,
      answer: null,
      start: null,
      secondsRemaining: null,
    };

    this.performActionCall(request);
    this.categorySelectionMode = false;
  }

  takeStakesRaisedInfo() {
    console.log('PODBITO STAWKE');
    this.initGame();
  }

  prepareWinnerTeamColor() {
    var color = this.winnerColor;
    return color === 'BLUE'
      ? 'NIEBIESCY'
      : color === 'GREEN'
      ? 'ZIELONI'
      : color === 'YELLOW'
      ? 'ŻÓŁCI'
      : color === 'BLACK'
      ? 'MISTRZOWIE'
      : '';
  }

  sellAnswer(price: number) {
    var request: PerformActionRequest = {
      gameId: this.gameId,
      action: Action.SELL_ANSWERS,
      category: null,
      price: price,
      teamColor: this.winnerColor,
      answer: null,
      start: null,
      secondsRemaining: null,
    };

    this.performActionCall(request);
    this.sellAnswersMode = false;
  }
  cancelSelling() {
    this.sellAnswersMode = false;

    var winner = this.game?.auctionWinner;
    var time: number | null =
      winner && winner.activeQuestion
        ? winner.activeQuestion.remainingTimeSec
        : 0;
    this.startStopQuestionTimer(time, true);
  }

  answerTheQuestion(isCorrect: boolean) {
    var request: PerformActionRequest = {
      gameId: this.gameId,
      action: Action.ANSWER_THE_QUESTION,
      category: null,
      price: null,
      teamColor: this.winnerColor,
      answer: isCorrect ? 'CORRECT' : 'WRONG',
      start: null,
      secondsRemaining: null,
    };

    this.performActionCall(request);
    this.givingAnswerMode = false;
  }

  prepareStageHeader() {
    return this.game?.gameStage === 'REGULAR'
      ? 'Pierwszy etap: RUNDA ' + this.game.roundNumber
      : this.game?.gameStage === 'FINAL'
      ? this.game.roundNumber > 5
        ? 'KONIEC GRY'
        : 'FINAŁ: RUNDA ' + this.game.roundNumber
      : '';
  }

  enableChangeBubblesAmountMode() {
    this.sellAnswersMode = false;
    this.changeBubblesAmountMode = true;
    this.categorySelectionMode = false;
  }

  cancelBubblesChange() {
    this.changeBubblesAmountMode = false;
  }

  changeBubblesAmount(request: ChangeBubblesAmountRequest) {
    if (this.game) {
      request.gameId = this.game?.gameId;
      console.log('CORRECT BUBBLES REQUEST ' + request);

      this.gameService.correctBubbles(request).subscribe({
        next: () => {
          this.initGame();
          this.changeBubblesAmountMode = false;
        },
      });
    }
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

  auctionHistoryHasChanged(option: string) {
    var request: ReverseRestoreAuctionRequest = {
      gameId: this.gameId,
      option: option,
    };

    this.gameService.reverseRestoreAuction(request).subscribe({
      complete: () => {
        console.log('Reversed or restored auction -> update auction history');
        this.initGame();
      },
    });
  }
}
