import {
  Action,
  CategoryData,
  HostAction,
  PerformActionRequest,
} from './../../../model/game';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/model/game';
import { HostGameService } from 'src/app/service/host-game-service';

const actionMap: { [key in Action]: string } = {
  [Action.START_GAME]: 'START_GAME',
  [Action.CHOOSE_CATEGORY]: '',
  [Action.START_AUCTION]: '',
  [Action.FINISH_AUCTION]: '',
  [Action.RANDOM_QUESTION]: '',
  [Action.SHOW_QUESTION]: '',
  [Action.SELL_ANSWERS]: '',
  [Action.ANSWER_THE_QUESTION]: '',
  [Action.FINISH_ROUND]: '',
  [Action.GO_TO_THE_FINAL]: '',
};

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
  goToTheFinalAction: HostAction = {
    action: Action.GO_TO_THE_FINAL,
    description: 'Przejdź do finału',
  };
  actions: HostAction[] = [];
  categories: CategoryData[] = [];

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

  performAction(hostAction: HostAction) {
    if (hostAction.action === Action.SELL_ANSWERS) {
      this.sellAnswersMode = true;
      return;
    }

    if (hostAction.action === Action.CHOOSE_CATEGORY) {
      this.categorySelectionMode = true;
      return;
    }

    if (hostAction.action === Action.ANSWER_THE_QUESTION) {
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

  updateContent(response: Game): void {
    this.game = response;
    this.actions = this.game.hostActions;

    if (this.game) {
      this.categories = this.game.categoryList;
      this.bubbleStakes = this.game.bubbleStakes;
      this.winnerColor = this.game.auctionWinner?.teamColor;
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
    };

    this.performActionCall(request);
    this.sellAnswersMode = false;
  }
  cancelSelling() {
    this.sellAnswersMode = false;
  }

  answerTheQuestion(isCorrect: boolean) {
    var request: PerformActionRequest = {
      gameId: this.gameId,
      action: Action.ANSWER_THE_QUESTION,
      category: null,
      price: null,
      teamColor: this.winnerColor,
      answer: isCorrect ? 'CORRECT' : 'WRONG',
    };

    this.performActionCall(request);
    this.givingAnswerMode = false;
  }

  prepareStageHeader() {
    return this.game?.gameStage === 'REGULAR'
      ? 'Pierwszy etap'
      : this.game?.gameStage === 'FINAL'
      ? 'FINAŁ'
      : '';
  }
}
