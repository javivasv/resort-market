import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private readonly cartService = inject(CartService);

  protected readonly items = this.cartService.items;
  protected readonly total = this.cartService.total;

  private readonly checkedOutState = signal(false);
  protected readonly checkedOut = this.checkedOutState.asReadonly();

  protected increment(activityId: string, currentQuantity: number): void {
    this.cartService.updateQuantity(activityId, currentQuantity + 1);
  }

  protected decrement(activityId: string, currentQuantity: number): void {
    this.cartService.updateQuantity(activityId, currentQuantity - 1);
  }

  protected remove(activityId: string): void {
    this.cartService.remove(activityId);
  }

  protected checkout(): void {
    this.cartService.clear();
    this.checkedOutState.set(true);
  }
}
