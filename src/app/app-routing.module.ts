import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { JoinGameFormComponent } from './join-game-form/join-game-form.component';

const routes: Routes = [
  { path: 'game/:id', component: GameComponent },
  { path: '', component: JoinGameFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
