import { TeamData } from './../../../model/game';
import { Component, Input } from '@angular/core';
import { Subject, interval, take, takeUntil, takeWhile } from 'rxjs';
import { CommonFunctionsComponent } from '../common-functions/common-functions.component';
import { Router } from '@angular/router';

const duratiuonMs: number = 1000; // czas odliczania w milisekundach

@Component({
  selector: 'app-bubbles-counter',
  templateUrl: './bubbles-counter.component.html',
  styleUrls: ['./bubbles-counter.component.css'],
})
export class BubblesCounterComponent extends CommonFunctionsComponent {
  @Input() stakesAmount!: number;
  @Input() teamColor!: string;
  @Input() answeredeCorrect!: boolean;

  counterStart: number = 0;
  counterStop: number = 0;

  constructor(router: Router) {
    super(router);
  }

  stopTimer = new Subject<void>();

  private intervalId: any;
  public isRunning: boolean = false;

  public startWhenWon() {
    if (this.isRunning) {
      return;
    }
    console.log('WON START');

    var counterValue: number = Math.abs(this.counterStart - this.counterStop);
    interval(duratiuonMs / (counterValue / 100))
      .pipe(takeWhile((x) => this.counterStop / 100 > x))
      .subscribe(() => {
        this.counterStart = this.counterStart + 100;
      });
  }

  public startWhenLose() {
    if (this.isRunning) {
      return;
    }
    console.log('LOSE START');
    var counterValue: number = Math.abs(this.counterStart - this.counterStop);
    interval(duratiuonMs / (counterValue / 100))
      .pipe(takeWhile((x) => this.counterStart > x - 100))
      .subscribe(() => {
        this.counterStart = this.counterStart - 100;
        if (this.counterStart < 0) {
          this.counterStart = 0;
        }
      });
  }

  public stop() {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.isRunning = false;
      this.stopTimer.next();
    }
  }

  public formatTime(): number {
    if (this.counterStart > this.stakesAmount) {
      return this.stakesAmount;
    }

    if (this.counterStart < 0) {
      return 0;
    }

    return this.counterStart;
  }

  override ngOnInit() {
    this.start();
  }

  public start() {
    this.isRunning = false;

    if (this.answeredeCorrect) {
      this.counterStart = 0;
      this.counterStop = this.stakesAmount;
      this.startWhenWon();
    } else {
      this.counterStart = this.stakesAmount;
      this.counterStop = 0;
      this.startWhenLose();
    }
  }

  prepareWonAmount(): number {
    return this.answeredeCorrect ? this.stakesAmount : 0;
  }

  reload() {
    this.reloadComponent(true);
  }
}
