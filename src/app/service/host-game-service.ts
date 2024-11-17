import { GameService } from 'src/app/service/game-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay } from 'rxjs';
import { environment } from '../config/environment';
import {
  Action,
  RaiseStakesRequest as RaiseStakesRequest,
  Game,
  PerformActionRequest,
  TeamData,
  ChangeBubblesAmountRequest,
} from '../model/game';

const baseEndpoint = '/host';

@Injectable({
  providedIn: 'root',
})
export class HostGameService {
  baseUrl = environment.apiUrl + baseEndpoint;

  constructor(private http: HttpClient, private gameService: GameService) {}

  raiseStakes(request: RaiseStakesRequest): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/raiseStakes`, request)
      .pipe(shareReplay());
  }

  initGame(gameId: string): Observable<Game> {
    return this.http
      .get<Game>(`${this.baseUrl}/init/${gameId}`)
      .pipe(shareReplay());
  }

  performAction(request: PerformActionRequest): Observable<Game> {
    return this.http
      .post<Game>(`${this.baseUrl}/performAction`, request)
      .pipe(catchError(this.gameService.handleError));
  }

  correctBubbles(request: ChangeBubblesAmountRequest): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/correctBubbles`, request)
      .pipe(shareReplay());
  }
}
