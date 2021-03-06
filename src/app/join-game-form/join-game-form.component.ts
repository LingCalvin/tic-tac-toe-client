import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from '../game.service';

@Component({
  selector: 'app-join-game-form',
  templateUrl: './join-game-form.component.html',
  styleUrls: ['./join-game-form.component.css'],
})
export class JoinGameFormComponent implements OnInit {
  isConnected$: Observable<boolean>;
  joinGameForm = new FormGroup({
    gameId: new FormControl('', Validators.required),
  });
  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    this.getConnectionStatus();
  }

  onSubmit(): void {
    if (this.joinGameForm.invalid) {
      return;
    }
    this.router.navigate(['game', this.joinGameForm.value.gameId]);
  }

  newGame(): void {
    this.router.navigateByUrl('/game/new');
  }

  getConnectionStatus(): void {
    this.isConnected$ = this.gameService
      .getConnectionStatusObservable()
      .pipe(map((status) => status === 'connected'));
  }
}
