import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from '../game.service';

@Component({
  selector: 'app-new-game-form',
  templateUrl: './new-game-form.component.html',
  styleUrls: ['./new-game-form.component.css'],
})
export class NewGameFormComponent implements OnInit {
  newGameForm = new FormGroup({ symbol: new FormControl('X') });
  isConnected$: Observable<boolean>;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.getConnectionStatus();
  }

  newGame(): void {
    this.gameService
      .create(this.newGameForm.value.symbol)
      .subscribe(({ gameId }) => this.router.navigate(['game', gameId]));
  }

  getConnectionStatus(): void {
    this.isConnected$ = this.gameService
      .getConnectionStatusObservable()
      .pipe(map((status) => status === 'connected'));
  }
}
