import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Activity } from '../../../backend-mock/models/activity.model';

@Component({
  selector: 'activity-card',
  imports: [RouterLink],
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.scss',
})
export class ActivityCard {
  activity = input.required<Activity>();
}
