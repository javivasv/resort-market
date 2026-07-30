import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCategories } from './activity-categories';

describe('ActivityCategories', () => {
  let component: ActivityCategories;
  let fixture: ComponentFixture<ActivityCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityCategories],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityCategories);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('option', { value: 'dining', label: 'Dining' });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the option label', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Dining');
  });

  it('emits select with the option value on click', () => {
    const emitted: unknown[] = [];
    component.select.subscribe((value) => emitted.push(value));

    fixture.nativeElement.querySelector('button').click();

    expect(emitted).toEqual(['dining']);
  });
});
