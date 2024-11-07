import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitParticipantGameComponent } from './app/component/participant/init-participant-game/init-participant-game.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './app/component/home/home.component';
import { InitHostGameComponent } from './app/component/host/init-host-game/init-host-game.component';
import { NewGameComponent } from './app/component/new-game/new-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new-game', component: NewGameComponent },
  { path: 'participant/:gameId', component: InitParticipantGameComponent },
  { path: 'host/:gameId', component: InitHostGameComponent },

  // { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
