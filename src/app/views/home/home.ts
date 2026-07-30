import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { ActivityCategory } from '../../../backend-mock/models/activity.model';
import { ActivityCard } from '../../components/activity-card/activity-card';
import { ActivityCategories, CategoryOption } from '../../components/activity-categories/activity-categories';

const CATEGORIES: CategoryOption[] = [
  { value: '', label: 'All' },
  { value: 'excursion', label: 'Excursions' },
  { value: 'dining', label: 'Dining' },
  { value: 'spa', label: 'Spa' },
  { value: 'room', label: 'Rooms' },
];

@Component({
  selector: 'home',
  imports: [
    ActivityCard,
    ActivityCategories,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Injected properties
  private readonly activityService = inject(ActivityService);

  // Constants
  protected readonly categories = CATEGORIES;
  
  // Signals
  protected readonly category = signal<ActivityCategory | ''>('');
  protected readonly search = signal('');
  protected readonly page = signal(1);
  private readonly loadingState = signal(false);

  // Observables
  private readonly category$ = toObservable(this.category);
  private readonly search$ = toObservable(this.search).pipe(debounceTime(300), distinctUntilChanged());
  private readonly page$ = toObservable(this.page);

  protected readonly result = toSignal(
    combineLatest([this.category$, this.search$, this.page$]).pipe(
      tap(() => this.loadingState.set(true)),
      switchMap(([category, search, page]) =>
        this.activityService
          .getActivities({ category, search, page })
          .pipe(tap(() => this.loadingState.set(false)))
      )
    ),
    { initialValue: undefined }
  );

  // Readonly
  protected readonly loading = this.loadingState.asReadonly();

  // Computed properties
  protected readonly pages = computed(() =>
    Array.from({ length: this.result()?.meta.totalPages ?? 0 }, (_, i) => i + 1)
  );

  // Methods
  protected setCategory(category: ActivityCategory | ''): void {
    this.category.set(category);
    this.page.set(1);
  }

  protected setSearch(value: string): void {
    this.search.set(value);
    this.page.set(1);
  }

  protected goToPage(page: number): void {
    this.page.set(page);
  }
}
