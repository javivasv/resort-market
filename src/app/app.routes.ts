import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { Activity } from './views/activity/activity';
import { Cart } from './views/cart/cart';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'cart', component: Cart },
  { path: 'activity/:id', component: Activity },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
