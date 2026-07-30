import { Component, input } from '@angular/core';
import { Activity } from '../../../backend-mock/models/activity.model';

@Component({
  selector: 'activity-card',
  imports: [],
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.scss',
})
export class ActivityCard {
  // Inputs
  activity = input.required<Activity>();
}
