import { Component, inject, input } from '@angular/core';
import { Activity } from '../../../backend-mock/models/activity.model';
import { Router } from '@angular/router';

@Component({
  selector: 'activity-card',
  imports: [],
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.scss',
})
export class ActivityCard {
  // Injected services
  router = inject(Router);

  // Inputs
  activity = input.required<Activity>();

  // Methods
  navigateToActivity() {
    this.router.navigate(['/activity', this.activity().id]);
  }
}
