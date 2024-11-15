import { HostGameService } from './../../../service/host-game-service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sell-answers',
  templateUrl: './sell-answers.component.html',
  styleUrls: ['./sell-answers.component.css'],
})
export class SellAnswersComponent {
  @Output() confirmBtn = new EventEmitter<number>();
  @Output() cancelBtn = new EventEmitter<void>();

  confirm(strValue: string) {
    this.confirmBtn.emit(+strValue);
  }
  cancel() {
    this.cancelBtn.emit();
  }
}
