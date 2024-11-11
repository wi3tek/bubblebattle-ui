import { GameService } from 'src/app/service/game-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay } from 'rxjs';
import { environment } from '../config/environment';
import { Action, Game, PerformActionRequest } from '../model/game';

const baseEndpoint = '/host';

@Injectable({
  providedIn: 'root',
})
export class HostGameService {
  baseUrl = environment.apiUrl + baseEndpoint;

  constructor(private http: HttpClient, private gameService: GameService) {}

  changeStatus(gameId: string): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/${gameId}`, null)
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
}
