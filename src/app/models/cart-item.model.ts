import { Activity } from '../../backend-mock/models/activity.model';

export interface CartItem {
  activity: Activity;
  quantity: number;
}
