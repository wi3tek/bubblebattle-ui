import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, Subject } from 'rxjs';
import { environment } from '../config/environment';
import { Game } from '../model/game';

const baseEndpoint = '/participant';

@Injectable({
  providedIn: 'root',
})
export class ParticipantGameService {
  private eventSource: EventSource | undefined;
  private sseDataSubject: Subject<string> = new Subject<string>();

  private static retryCount = 0;
  private static readonly MAX_RETRIES = 10;

  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl + baseEndpoint;

  private connectToSSE(gameId: string) {
    this.eventSource = new EventSource(this.baseUrl + `/subscribe/${gameId}`);

    this.eventSource.onmessage = (event) => {
      console.log('start');
      console.log('received event', event.data);
      this.sseDataSubject.next(event.data);
    };

    this.eventSource.onerror = (error) => {
      console.log('error', error);
      if (
        ParticipantGameService.retryCount > ParticipantGameService.MAX_RETRIES
      ) {
        console.log('too many retries');
        this.sseDataSubject.error(error);
        this.eventSource!.close();
        return;
      }
      ParticipantGameService.retryCount++;
      this.sseDataSubject.error(error);
      this.eventSource!.close();
      this.connectToSSE(gameId);
    };
  }

  subscribeParticipantGame(gameId: string): Observable<string> {
    if (!this.eventSource) {
      this.connectToSSE(gameId);
    }
    return this.sseDataSubject.asObservable();
  }

  initGame(gameId: string): Observable<Game> {
    return this.http
      .get<Game>(`${this.baseUrl}/init/${gameId}`)
      .pipe(shareReplay());
  }
}
