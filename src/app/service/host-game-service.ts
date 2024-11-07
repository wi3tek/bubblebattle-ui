import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../config/environment';
import { Game } from '../model/game';

const baseEndpoint = '/host';

@Injectable({
  providedIn: 'root',
})
export class HostGameService {
  baseUrl = environment.apiUrl + baseEndpoint;

  constructor(private http: HttpClient) {}

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
}
