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
import { TeamStakesComponent } from './app/component/team-stakes/team-stakes.component';
import { PointReplacerPipe } from './app/config/pipes';
import { TeamBubblesComponent } from './app/component/participant/team-bubbles/team-bubbles.component';
import { ActionButtonComponent } from './app/component/common/action-button/action-button.component';
import { NewGameComponent } from './app/component/new-game/new-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorySelectionComponent } from './app/component/host/category-selection/category-selection.component';
import { AuctionComponent } from './app/component/host/auction/auction.component';
import { AuctionItemComponent } from './app/component/host/auction-item/auction-item.component';
import { HostQuestionComponent } from './app/component/host/host-question/host-question.component';
import { ParticipantQuestionComponent } from './app/component/participant/participant-question/participant-question.component';
import { TimerComponent } from './app/component/timer/timer.component';
import { SellAnswersComponent } from './app/component/host/sell-answers/sell-answers.component';
import { CustomInputComponent } from './app/component/common/custom-input/custom-input.component';
import { GivingAnswerComponent } from './app/component/host/giving-answer/giving-answer.component';
import { BubblesCounterComponent } from './app/component/common/bubbles-counter/bubbles-counter.component';
import { ChangeBubblesAmountComponent } from './app/component/host/change-bubbles-amount/change-bubbles-amount.component';
import { GameTitleComponent } from './app/component/common/game-title/game-title.component';
import { CommonFunctionsComponent } from './app/component/common/common-functions/common-functions.component';
import { EndGameComponent } from './app/component/end-game/end-game.component';
import { ConfirmDialogComponent } from './app/component/common/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InitParticipantGameComponent,
    HomeComponent,
    InitHostGameComponent,
    TeamStakesComponent,
    PointReplacerPipe,
    TeamBubblesComponent,
    ActionButtonComponent,
    NewGameComponent,
    CategorySelectionComponent,
    AuctionComponent,
    AuctionItemComponent,
    HostQuestionComponent,
    ParticipantQuestionComponent,
    TimerComponent,
    SellAnswersComponent,
    CustomInputComponent,
    GivingAnswerComponent,
    BubblesCounterComponent,
    ChangeBubblesAmountComponent,
    GameTitleComponent,
    CommonFunctionsComponent,
    EndGameComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [PointReplacerPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
