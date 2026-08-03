import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Activity } from '../../backend-mock/models/activity.model';
import { CartItem } from '../models/cart-item.model';

export const CART_STORAGE_KEY = 'resort-market-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly itemsState = signal<CartItem[]>(this.loadFromStorage());
  readonly items = this.itemsState.asReadonly();

  readonly itemCount = computed(() =>
    this.itemsState().reduce((count, item) => count + item.quantity, 0)
  );

  readonly total = computed(() =>
    this.itemsState().reduce((sum, item) => sum + item.activity.price * item.quantity, 0)
  );

  add(activity: Activity, quantity = 1): void {
    this.itemsState.update((items) => {
      const existing = items.find((item) => item.activity.id === activity.id);
      const next = existing
        ? items.map((item) =>
            item.activity.id === activity.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...items, { activity, quantity }];

      this.saveToStorage(next);
      return next;
    });
  }

  remove(activityId: string): void {
    this.itemsState.update((items) => {
      const next = items.filter((item) => item.activity.id !== activityId);
      this.saveToStorage(next);
      return next;
    });
  }

  updateQuantity(activityId: string, quantity: number): void {
    if (quantity < 1) {
      this.remove(activityId);
      return;
    }

    this.itemsState.update((items) => {
      const next = items.map((item) =>
        item.activity.id === activityId ? { ...item, quantity } : item
      );
      this.saveToStorage(next);
      return next;
    });
  }

  clear(): void {
    this.itemsState.set([]);
    this.saveToStorage([]);
  }

  private loadFromStorage(): CartItem[] {
    if (!this.isBrowser) {
      return [];
    }

    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(items: CartItem[]): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
}
