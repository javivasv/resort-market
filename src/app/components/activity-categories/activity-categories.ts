import { Component, input, output } from '@angular/core';
import { ActivityCategory } from '../../../backend-mock/models/activity.model';

export interface CategoryOption {
  value: ActivityCategory | '';
  label: string;
}

@Component({
  selector: 'activity-categories',
  imports: [],
  templateUrl: './activity-categories.html',
  styleUrl: './activity-categories.scss',
})
export class ActivityCategories {
  option = input.required<CategoryOption>();
  selected = input<boolean>(false);
  select = output<ActivityCategory | ''>();

  onClick(): void {
    this.select.emit(this.option().value);
  }
}
