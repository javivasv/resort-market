import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCard } from './activity-card';
import { Activity } from '../../../backend-mock/models/activity.model';

describe('ActivityCard', () => {
  let component: ActivityCard;
  let fixture: ComponentFixture<ActivityCard>;

  const mockActivity: Activity = {
    id: 'act-001',
    name: 'Sunset Catamaran Cruise',
    category: 'excursion',
    price: 89.99,
    rating: 4.7,
    description: 'A guided sunset sail along the coast.',
    imageUrl: '/mock/catamaran.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activity', mockActivity);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the activity name, price, and rating', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Sunset Catamaran Cruise');
    expect(text).toContain('$89.99');
    expect(text).toContain('4.7');
  });
});
