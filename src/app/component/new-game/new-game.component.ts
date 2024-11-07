import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateGameRequest } from 'src/app/model/game';
import { GameService } from 'src/app/service/game-service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
})
export class NewGameComponent {
  newGameForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private gameService: GameService, private location: Location) {}

  ngOnInit() {}

  add() {
    const formData = this.newGameForm.value;

    if (formData.name === null || formData.name === undefined) {
      throw new Error();
    }

    let request: CreateGameRequest = {
      name: formData.name,
    };

    this.gameService.createGame(request).subscribe({
      complete: () => {
        this.location.back();
      },
    });
  }

  cancel() {
    this.location.back();
  }
}
