import { Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent {
  @Input() canStart!: boolean;
  @Output() secondsAgo = new EventEmitter<number>();

  private intervalId: any;
  public isRunning: boolean = false;
  counter: number = 0;
  stopTimer = new Subject<void>();

  public start(seconds: number) {
    console.log('STARTED TIMER FROM TimerComponent');

    this.counter = seconds * 1000;

    console.warn(
      `isRunning=${this.isRunning}, counter=${this.counter}, seconds=${seconds}`
    );
    if (!this.isRunning) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {}, 1000);

      interval(1000)
        .pipe(takeUntil(this.stopTimer))
        .subscribe(() => {
          this.counter = this.counter - 1000;
        });
    }
  }

  public stop() {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.isRunning = false;
      this.stopTimer.next();
    }
  }

  public reset() {
    this.stop();
    this.counter = 60000;
  }

  public formatTime(milliseconds: number): string {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    const paddedHours = this.padNumber(hours);
    const paddedMinutes = this.padNumber(minutes);
    const paddedSeconds = this.padNumber(seconds);

    return `${paddedMinutes}:${paddedSeconds}`;
  }

  private padNumber(number: number): string {
    return number.toString().padStart(2, '0');
  }

  ngOnDestroy() {
    this.reset();
  }

  ngOnInit() {
    this.start(60);
  }
}
