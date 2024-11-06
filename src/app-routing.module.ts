import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitParticipantGameComponent } from './app/component/init-participant-game/init-participant-game.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './app/component/home/home.component';
import { InitHostGameComponent } from './app/component/init-host-game/init-host-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'participant/:gameId', component: InitParticipantGameComponent },
  { path: 'host/:gameId', component: InitHostGameComponent },

  // { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
