export type ActivityCategory = 'excursion' | 'dining' | 'spa' | 'room';

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  price: number;
  rating: number;
  description: string;
  imageUrl: string;
}
