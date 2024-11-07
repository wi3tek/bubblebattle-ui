import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css'],
})
export class ActionButtonComponent {
  @Output() clickButton = new EventEmitter<void>();
  @Input() textValue!: string;
  @Input() width: string = '300';
  @Input() icon: string = '';
  @Input() height: string = '30';
  @Input() fontSize: string = '20';

  emit(): void {
    this.clickButton.emit();
  }
}
