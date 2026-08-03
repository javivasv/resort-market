import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { CartService } from '../../services/cart.service';
import { Activity as ActivityModel } from '../../../backend-mock/models/activity.model';

@Component({
  selector: 'activity',
  imports: [RouterLink],
  templateUrl: './activity.html',
  styleUrl: './activity.scss',
})
export class Activity {
  // Injected services
  private readonly activityService = inject(ActivityService);
  private readonly cartService = inject(CartService);

  // Inputs
  id = input.required<string>();

  // Signals
  private readonly loadingState = signal(false);
  private readonly notFoundState = signal(false);
  private readonly justAddedState = signal(false);

  // Readonly
  protected readonly loading = this.loadingState.asReadonly();
  protected readonly notFound = this.notFoundState.asReadonly();
  protected readonly justAdded = this.justAddedState.asReadonly();

  protected readonly activity = toSignal(
    toObservable(this.id).pipe(
      tap(() => {
        this.loadingState.set(true);
        this.notFoundState.set(false);
        this.justAddedState.set(false);
      }),
      switchMap((id) =>
        this.activityService.getActivityById(id).pipe(
          tap(() => this.loadingState.set(false)),
          catchError(() => {
            this.loadingState.set(false);
            this.notFoundState.set(true);
            return of(undefined);
          })
        )
      )
    ),
    { initialValue: undefined }
  );

  protected bookNow(item: ActivityModel): void {
    this.cartService.add(item);
    this.justAddedState.set(true);
  }
}
