import { Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent {
  @Output() secondsAgo = new EventEmitter<number>();
  @Input() audioEnabled!: boolean;
  @Input() seconds!: number;
  @Input() startOnInit: boolean = true;

  audio = new Audio();

  private intervalId: any;
  public isRunning: boolean = false;
  counter: number = 0;
  stopTimer = new Subject<void>();
  timer = <HTMLAudioElement>document.getElementById('timer');

  public start(seconds: number) {
    console.log('STARTED TIMER FROM TimerComponent');
    this.counter = seconds * 1000;

    this.startAudio();

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
          this.secondsAgo.emit(this.counter);

          if (this.counter <= 0 || !this.startOnInit) {
            this.stopAudio();
          }
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

    const paddedHours = this.padNumber(hours < 0 ? 0 : hours);
    const paddedMinutes = this.padNumber(minutes < 0 ? 0 : minutes);
    const paddedSeconds = this.padNumber(seconds < 0 ? 0 : seconds);
    ``;
    return `${paddedMinutes}:${paddedSeconds}`;
  }

  private padNumber(number: number): string {
    return number.toString().padStart(2, '0');
  }

  ngOnDestroy() {
    this.reset();
  }

  ngOnInit() {
    if (!this.startOnInit) {
      this.counter = this.seconds * 1000;
      return;
    }
    this.start(this.seconds);
  }

  startAudio() {
    if (!this.audioEnabled) {
      return;
    }
    this.audio = new Audio();
    this.audio.src = '../../../assets/sounds/retro/question.wav';
    this.audio.load();
    this.audio.muted;
    this.audio.play();
  }

  stopAudio() {
    this.audio.pause();
  }
}
