import {
  Action,
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

  actions: HostAction[] = [];

  constructor(private gameService: HostGameService) {
    this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit() {
    this.gameService.initGame(this.gameId).subscribe({
      next: (response) => {
        this.game = response;
        this.actions = this.game.hostActions;
      },
    });
  }

  performAction(hostAction: HostAction) {
    var request: PerformActionRequest = {
      gameId: this.gameId,
      action: hostAction.action,
    };

    this.gameService.performAction(request).subscribe({
      next: (response) => {
        this.game = response;
        this.actions = this.game.hostActions;
      },
    });
  }
}
