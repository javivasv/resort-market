import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { NestResponse, PaginatedData } from '../../backend-mock/models/nest-response.model';
import { Activity, ActivityCategory } from '../../backend-mock/models/activity.model';

export interface ActivityQuery {
  category?: ActivityCategory | '';
  search?: string;
  page?: number;
  itemsPerPage?: number;
}

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private readonly http = inject(HttpClient);

  getActivities(query: ActivityQuery): Observable<PaginatedData<Activity>> {
    let params = new HttpParams()
      .set('page', String(query.page ?? 1))
      .set('itemsPerPage', String(query.itemsPerPage ?? 6));

    if (query.category) {
      params = params.set('category', query.category);
    }
    if (query.search) {
      params = params.set('search', query.search);
    }

    return this.http
      .get<NestResponse<PaginatedData<Activity>>>('/api/activities', { params })
      .pipe(map((res) => res.data));
  }
}
