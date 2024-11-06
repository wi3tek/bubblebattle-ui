import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { TeamData } from 'src/app/model/game';

@Component({
  selector: 'app-team-stakes',
  templateUrl: './team-stakes.component.html',
  styleUrls: ['./team-stakes.component.css'],
})
export class TeamStakesComponent {
  @Input() team!: TeamData;
  @Input() headerTitle: string = 'STAN BOMBELKÓW';
}
