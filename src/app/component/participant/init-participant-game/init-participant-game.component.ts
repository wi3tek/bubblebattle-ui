import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/model/game';
import { ParticipantGameService } from 'src/app/service/participant-game-service';
import { ParticipantQuestionComponent } from '../participant-question/participant-question.component';

@Component({
  selector: 'app-init-participant-game',
  templateUrl: './init-participant-game.component.html',
  styleUrls: ['./init-participant-game.component.css'],
})
export class InitParticipantGameComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  game: Game | null = null;
  gameId: string;
  waitingForResult: boolean = false;
  gameStage: string = '';
  roundStage: string = '';
  @ViewChild(ParticipantQuestionComponent)
  participantQuestionRef!: ParticipantQuestionComponent;

  public constructor(
    private initGameService: ParticipantGameService,
    private cd: ChangeDetectorRef
  ) {
    this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit(): void {
    this.initGameService.initGame(this.gameId).subscribe({
      next: (response) => {
        this.game = response;
        this.gameStage = this.game.gameStage;
        this.roundStage = this.game.roundStage;
      },
    });

    this.initGameService.subscribeParticipantGame(this.gameId).subscribe({
      next: (response) => {
        this.waitingForResult = false;
        console.log('received game', response);
        this.game = JSON.parse(response);
        this.gameStage = this.game ? this.game.gameStage : this.gameStage;
        this.roundStage = this.game ? this.game.roundStage : this.roundStage;
        this.participantQuestionRef.startTimer();
        console.log(this.game);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
