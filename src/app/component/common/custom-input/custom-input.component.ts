import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent {
  newGameForm = new FormGroup({
    value: new FormControl(''),
  });

  ngOnInit() {}

  @Input() placeholder = 'Podaj coś tam';
  @Input() buttonValue!: string;
  @Output() cancelBtn = new EventEmitter<void>();
  @Output() confirmBtn = new EventEmitter<string>();

  confirm() {
    const formData = this.newGameForm.value;

    if (formData.value === null || formData.value === undefined) {
      throw new Error();
    }

    this.confirmBtn.emit(formData.value);
  }

  cancel() {
    this.cancelBtn.emit();
  }
}
