import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';
import { JoinPageComponent } from './join-page/join-page.component';

const routes: Routes = [
  { path: 'game/:id', component: GamePageComponent },
  { path: '', component: JoinPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
