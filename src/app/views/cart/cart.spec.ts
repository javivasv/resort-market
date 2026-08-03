import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Cart } from './cart';
import { CartService } from '../../services/cart.service';
import { Activity } from '../../../backend-mock/models/activity.model';

const mockActivity: Activity = {
  id: 'act-001',
  name: 'Sunset Catamaran Cruise',
  category: 'excursion',
  price: 89.99,
  rating: 4.7,
  description: 'A guided sunset sail along the coast.',
  imageUrl: '/mock/catamaran.jpg',
};

describe('Cart', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;
  let cartService: CartService;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Cart],
      providers: [provideRouter([])],
    }).compileComponents();

    cartService = TestBed.inject(CartService);
    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.clear();
  });

  function findButtonByText(label: string): HTMLButtonElement | undefined {
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('button');
    return Array.from(buttons).find((button) => button.textContent?.trim() === label);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the empty state when the cart has no items', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Your cart is empty');
  });

  it('lists items and shows the total when the cart has items', async () => {
    cartService.add(mockActivity, 2);
    await fixture.whenStable();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Sunset Catamaran Cruise');
    expect(text).toContain('179.98');
  });

  it('increments quantity via the + button', async () => {
    cartService.add(mockActivity);
    await fixture.whenStable();

    findButtonByText('+')?.click();
    await fixture.whenStable();

    expect(cartService.items()[0].quantity).toBe(2);
  });

  it('removes the item via the remove button', async () => {
    cartService.add(mockActivity);
    await fixture.whenStable();

    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button[aria-label="Remove from cart"]')?.click();
    await fixture.whenStable();

    expect(cartService.items().length).toBe(0);
  });

  it('clears the cart and shows a confirmation on checkout', async () => {
    cartService.add(mockActivity);
    await fixture.whenStable();

    findButtonByText('Checkout')?.click();
    await fixture.whenStable();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Booking confirmed');
    expect(cartService.items().length).toBe(0);
  });
});
