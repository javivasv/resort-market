import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { ActivityService } from './activity.service';
import { NestResponse, PaginatedData } from '../../backend-mock/models/nest-response.model';
import { Activity } from '../../backend-mock/models/activity.model';

describe('ActivityService', () => {
  let service: ActivityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ActivityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests /api/activities with default pagination params', () => {
    service.getActivities({}).subscribe();

    const req = httpMock.expectOne(
      (r) => r.url === '/api/activities' && r.params.get('page') === '1' && r.params.get('itemsPerPage') === '6'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse());
  });

  it('includes category and search params only when provided', () => {
    service.getActivities({ category: 'dining', search: 'chef' }).subscribe();

    const req = httpMock.expectOne(
      (r) => r.params.get('category') === 'dining' && r.params.get('search') === 'chef'
    );
    req.flush(mockResponse());
  });

  it('omits category and search params when not provided', () => {
    service.getActivities({}).subscribe();

    const req = httpMock.expectOne((r) => r.url === '/api/activities');
    expect(req.request.params.has('category')).toBe(false);
    expect(req.request.params.has('search')).toBe(false);
    req.flush(mockResponse());
  });

  it('unwraps the NestResponse envelope and returns the data payload', async () => {
    const promise = firstValueFrom(service.getActivities({}));

    const req = httpMock.expectOne((r) => r.url === '/api/activities');
    req.flush(mockResponse());

    const result = await promise;
    expect(result.items.length).toBe(1);
    expect(result.items[0].name).toBe('Test Activity');
    expect(result.meta.totalItems).toBe(1);
  });
});

function mockResponse(): NestResponse<PaginatedData<Activity>> {
  return {
    statusCode: 200,
    message: 'Success',
    data: {
      items: [
        {
          id: 'act-999',
          name: 'Test Activity',
          category: 'dining',
          price: 42,
          rating: 4.5,
          description: 'A test activity.',
          imageUrl: '/mock/test.jpg',
        },
      ],
      meta: { totalItems: 1, itemsPerPage: 6, currentPage: 1, totalPages: 1 },
    },
  };
}
