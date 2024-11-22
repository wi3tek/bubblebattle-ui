import { Component } from '@angular/core';

@Component({
  selector: 'app-game-title',
  templateUrl: './game-title.component.html',
  styleUrls: ['./game-title.component.css'],
})
export class GameTitleComponent {
  title = 'Awantura o bombelki';

  ngOnInit() {
    let audio = new Audio();
    audio.src = '../../../../assets/sounds/czolowka.wav';
    audio.load();
    audio.muted;
    audio.play();
  }
}
