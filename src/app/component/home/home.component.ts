import { Game, GetGamesResponse, SimpleGame } from './../../model/game';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  games: SimpleGame[] = [];
  constructor(private commongGameService: GameService) {}
  ngOnInit(): void {
    this.commongGameService.getGames().subscribe({
      next: (response) => {
        this.games = response.games;
      },
    });
  }
}
