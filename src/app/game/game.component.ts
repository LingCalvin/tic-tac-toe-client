import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../classes/game';
import {GameService} from '../game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game$: Observable<Game>;

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.game$ = this.gameService.getGameObservable();
    const gameId = this.route.snapshot.paramMap.get('id');
    this.gameService.join(gameId);
  }

  makeMove(position: number): void {
    const x = position % 3;
    const y = Math.floor(position / 3);
    this.gameService.move(x, y);
  }

}
