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
import { takeWhile } from 'rxjs/operators';
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

  constructor(private http: HttpClient) {
    this.handleResponse = this.handleResponse.bind(this);
    this.gameSubject = new BehaviorSubject(new Game());
    this.socket = webSocket(environment.websocketURL);
    this.socket.asObservable().subscribe(this.handleResponse);
    this.pinger = interval(45000)
      .pipe(takeWhile(() => !this.socket.isStopped))
      .subscribe(() => this.socket.next({ event: 'ping' }));
  }
  private handleResponse(res: any): void {
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

  create(): any {
    // this.socket.next({ event: 'create' });
    return this.http.post(`${environment.restURL}/games/create`, {
      playerId: this.clientId,
    });
  }

  join(gameId: string): void {
    this.socket.next({ event: 'join', data: gameId });
  }

  move(x: number, y: number): void {
    this.socket.next({ event: 'move', data: { x, y } });
  }

  getGameObservable(): Observable<Game> {
    return this.gameSubject.asObservable();
  }
}
