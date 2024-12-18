import { TeamData } from 'src/app/model/game';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css'],
})
export class EndGameComponent {
  @Input() winner!: TeamData;

  prepareTeamColor(): string {
    const teamColor = this.winner.teamColor;
    return teamColor === 'BLUE'
      ? 'NIEBIESCY'
      : teamColor === 'GREEN'
      ? 'ZIELONI'
      : teamColor === 'YELLOW'
      ? 'ŻÓŁCI'
      : teamColor === 'BLACK'
      ? 'MISTRZOWIE'
      : '';
  }

  ngOnInit() {
    let audio = new Audio();
    audio.src = '../../../assets/sounds/retro/end-game.wav';
    audio.load();
    audio.muted;
    audio.play().catch((e) => console.log(e));
  }
}
