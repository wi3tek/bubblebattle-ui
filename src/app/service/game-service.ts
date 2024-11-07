import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, Subject, throwError } from 'rxjs';
import { CreateGameRequest, Game, GetGamesResponse } from '../model/game';
import { environment } from '../config/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getGames(): Observable<GetGamesResponse> {
    return this.http
      .get<GetGamesResponse>(this.baseUrl + '/getGames')
      .pipe(catchError(this.handleError));
  }

  createGame(request: CreateGameRequest): Observable<Game> {
    return this.http
      .post<Game>(this.baseUrl + '/createGame', request)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured on client side:', error.error);
    } else {
      console.error('Backend returned code:', error.status, error.error);
    }

    return throwError(() => new Error('LeagueService error: ' + error.message));
  }
}
