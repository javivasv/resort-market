import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';

import { CartService, CART_STORAGE_KEY } from './cart.service';
import { Activity } from '../../backend-mock/models/activity.model';

const mockActivity: Activity = {
  id: 'act-001',
  name: 'Sunset Catamaran Cruise',
  category: 'excursion',
  price: 89.99,
  rating: 4.7,
  description: 'A guided sunset sail along the coast.',
  imageUrl: '/mock/catamaran.jpg',
};

const otherActivity: Activity = {
  id: 'act-002',
  name: 'Deep Sea Fishing Charter',
  category: 'excursion',
  price: 149,
  rating: 4.5,
  description: 'Half-day fishing charter with equipment and crew provided.',
  imageUrl: '/mock/fishing.jpg',
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts empty', () => {
    expect(service.items()).toEqual([]);
    expect(service.itemCount()).toBe(0);
    expect(service.total()).toBe(0);
  });

  it('adds a new activity as a new line item', () => {
    service.add(mockActivity);

    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(1);
    expect(service.itemCount()).toBe(1);
    expect(service.total()).toBeCloseTo(89.99);
  });

  it('merges quantity when adding the same activity again', () => {
    service.add(mockActivity);
    service.add(mockActivity);

    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(2);
    expect(service.itemCount()).toBe(2);
  });

  it('tracks separate line items for different activities', () => {
    service.add(mockActivity);
    service.add(otherActivity);

    expect(service.items().length).toBe(2);
    expect(service.itemCount()).toBe(2);
    expect(service.total()).toBeCloseTo(89.99 + 149);
  });

  it('updates the quantity of an existing line item', () => {
    service.add(mockActivity);
    service.updateQuantity(mockActivity.id, 5);

    expect(service.items()[0].quantity).toBe(5);
    expect(service.itemCount()).toBe(5);
  });

  it('removes the item when quantity is updated below 1', () => {
    service.add(mockActivity);
    service.updateQuantity(mockActivity.id, 0);

    expect(service.items()).toEqual([]);
  });

  it('removes an item directly', () => {
    service.add(mockActivity);
    service.add(otherActivity);
    service.remove(mockActivity.id);

    expect(service.items().length).toBe(1);
    expect(service.items()[0].activity.id).toBe(otherActivity.id);
  });

  it('clears all items', () => {
    service.add(mockActivity);
    service.add(otherActivity);
    service.clear();

    expect(service.items()).toEqual([]);
    expect(service.total()).toBe(0);
  });

  it('persists changes to localStorage', () => {
    service.add(mockActivity);

    const raw = localStorage.getItem(CART_STORAGE_KEY);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw as string)).toEqual([{ activity: mockActivity, quantity: 1 }]);
  });
});

describe('CartService (restoring from storage)', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('restores cart state from localStorage on creation', () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ activity: mockActivity, quantity: 3 }]));

    TestBed.configureTestingModule({});
    const service = TestBed.inject(CartService);

    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(3);
  });
});

describe('CartService (server platform)', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('does not touch localStorage when rendering on the server', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    const service = TestBed.inject(CartService);

    expect(() => service.add(mockActivity)).not.toThrow();
    expect(service.items().length).toBe(1);
    expect(localStorage.getItem(CART_STORAGE_KEY)).toBeNull();
  });
});
