import { HostAction } from './../../../model/game';
import { Component, inject } from '@angular/core';
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
}
