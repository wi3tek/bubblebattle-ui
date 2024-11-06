import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/component/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InitParticipantGameComponent } from './app/component/participant/init-participant-game/init-participant-game.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './app/component/home/home.component';
import { InitHostGameComponent } from './app/component/host/init-host-game/init-host-game.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsComponent } from './app/components/components.component';
import { TeamStakesComponent } from './app/component/team-stakes/team-stakes.component';
import { PointReplacerPipe } from './app/config/pipes';
import { AuctionComponent } from './app/component/participant/auction/auction.component';

@NgModule({
  declarations: [
    AppComponent,
    InitParticipantGameComponent,
    HomeComponent,
    InitHostGameComponent,
    ComponentsComponent,
    TeamStakesComponent,
    PointReplacerPipe,
    AuctionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  providers: [PointReplacerPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
