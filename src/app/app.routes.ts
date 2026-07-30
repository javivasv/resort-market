import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { Activity } from './views/activity/activity';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'activity/:id', component: Activity },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
