import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Game } from './classes/game';
import { delay, retryWhen, takeWhile, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  socket: WebSocketSubject<any>;
  gameSubject: BehaviorSubject<Game>;
  clientId: string;
  pinger: Subscription;
  gameId = new Subject<string>();
  private connectionStatus = new BehaviorSubject<'connected' | 'disconnected'>(
    'disconnected'
  );

  constructor(private http: HttpClient) {
    this.handleResponse = this.handleResponse.bind(this);
    this.gameSubject = new BehaviorSubject(new Game());
    this.socket = webSocket(environment.websocketURL);
    this.socket
      .asObservable()
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            tap(() => this.connectionStatus.next('disconnected')),
            delay(15000)
          )
        )
      )
      .subscribe(this.handleResponse, (error) => {
        if (error.type === 'close') {
          this.connectionStatus.next('disconnected');
        }
      });
    this.pinger = interval(45000)
      .pipe(takeWhile(() => !this.socket.isStopped))
      .subscribe(() => this.socket.next({ event: 'ping' }));
  }

  private handleResponse(res: any): void {
    console.log(res);
    this.connectionStatus.next('connected');
    const clientId = res.data?.clientId;
    if (clientId) {
      this.clientId = clientId;
    }
    const game = res.data?.game;
    if (game) {
      this.handleGameUpdate(game);
    }
  }

  private handleGameUpdate(game: Game): void {
    this.gameSubject.next(game);
  }

  create(symbol?: 'X' | 'O'): any {
    return this.http.post(`${environment.restURL}/games/create`, {
      playerId: this.clientId,
      symbol,
    });
  }

  join(gameId: string, symbol?: 'X' | 'O'): void {
    this.socket.next({ event: 'join', data: { gameId, symbol } });
  }

  move(x: number, y: number): void {
    this.socket.next({ event: 'move', data: { x, y } });
  }

  getGameObservable(): Observable<Game> {
    return this.gameSubject.asObservable();
  }

  getConnectionStatusObservable(): Observable<'connected' | 'disconnected'> {
    return this.connectionStatus.asObservable();
  }
}
