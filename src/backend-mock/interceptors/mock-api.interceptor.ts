import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NestResponse, PaginatedData } from '../models/nest-response.model';
import { Activity } from '../models/activity.model';
import { ACTIVITIES } from '../data/activities.data';

const MOCK_LATENCY_MS = 400;

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/')) {
    return next(req);
  }

  if (req.method === 'GET' && req.url === '/api/activities') {
    return of(buildActivitiesResponse(req)).pipe(delay(MOCK_LATENCY_MS));
  }

  if (req.method === 'GET' && req.url.startsWith('/api/activities/')) {
    return buildActivityByIdResponse(req).pipe(delay(MOCK_LATENCY_MS));
  }

  return next(req);
};

function buildActivitiesResponse(req: HttpRequest<unknown>): HttpResponse<NestResponse<PaginatedData<Activity>>> {
  const category = req.params.get('category');
  const search = req.params.get('search')?.toLowerCase() ?? '';
  const page = Number(req.params.get('page') ?? 1);
  const itemsPerPage = Number(req.params.get('itemsPerPage') ?? 6);

  let filtered = ACTIVITIES;
  if (category) {
    filtered = filtered.filter((activity) => activity.category === category);
  }
  if (search) {
    filtered = filtered.filter((activity) => activity.name.toLowerCase().includes(search));
  }

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const start = (page - 1) * itemsPerPage;
  const items = filtered.slice(start, start + itemsPerPage);

  const body: NestResponse<PaginatedData<Activity>> = {
    statusCode: 200,
    message: 'Success',
    data: {
      items,
      meta: { totalItems, itemsPerPage, currentPage: page, totalPages },
    },
  };

  return new HttpResponse({ status: 200, body });
}

function buildActivityByIdResponse(req: HttpRequest<unknown>): Observable<HttpResponse<NestResponse<Activity>>> {
  const id = req.url.split('/').pop();
  const activity = ACTIVITIES.find((a) => a.id === id);

  if (!activity) {
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 404,
          url: req.url,
          error: { statusCode: 404, message: 'Activity not found', data: null },
        })
    );
  }

  const body: NestResponse<Activity> = { statusCode: 200, message: 'Success', data: activity };
  return of(new HttpResponse({ status: 200, body }));
}
