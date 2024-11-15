import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryData } from 'src/app/model/game';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.css'],
})
export class CategorySelectionComponent {
  @Input() categories!: CategoryData[];
  selectedCategory: CategoryData | null = null;
  @Output() chosenCategory = new EventEmitter<string>();

  chooseCategory(arg0: CategoryData) {
    this.selectedCategory = arg0;
    console.log(this.selectedCategory);
  }

  takeClick() {
    console.log(this.selectedCategory);

    this.chosenCategory.emit(this.selectedCategory?.value);
  }
}
