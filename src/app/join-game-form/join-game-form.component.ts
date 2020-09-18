import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-join-game-form',
  templateUrl: './join-game-form.component.html',
  styleUrls: ['./join-game-form.component.css'],
})
export class JoinGameFormComponent {
  JoinGameForm = new FormGroup({
    gameId: new FormControl('', Validators.required),
  });
  constructor(private router: Router, private gameService: GameService) {}

  onSubmit(): void {
    if (this.JoinGameForm.invalid) {
      return;
    }
    this.router.navigate(['game', this.JoinGameForm.value.gameId]);
  }

  newGame(): void {
    this.gameService.create().subscribe(({gameId}) => this.router.navigate(['game', gameId]));
    // this.gameService.getGameObservable().subscribe((game) => this.router.navigate(['game', game.id]));
  }
}
