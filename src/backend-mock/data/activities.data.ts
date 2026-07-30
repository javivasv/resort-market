import { Activity } from '../models/activity.model';

export const ACTIVITIES: Activity[] = [
  { id: 'act-001', name: 'Sunset Catamaran Cruise', category: 'excursion', price: 89.99, rating: 4.7, description: 'A guided sunset sail along the coast with drinks included.', imageUrl: '/mock/catamaran.jpg' },
  { id: 'act-002', name: 'Deep Sea Fishing Charter', category: 'excursion', price: 149.0, rating: 4.5, description: 'Half-day fishing charter with equipment and crew provided.', imageUrl: '/mock/fishing.jpg' },
  { id: 'act-003', name: 'Snorkeling Reef Tour', category: 'excursion', price: 65.0, rating: 4.8, description: 'Guided snorkeling tour of the nearby coral reef.', imageUrl: '/mock/snorkel.jpg' },
  { id: 'act-004', name: 'Oceanview Fine Dining', category: 'dining', price: 120.0, rating: 4.9, description: 'A five-course tasting menu overlooking the ocean.', imageUrl: '/mock/dining-fine.jpg' },
  { id: 'act-005', name: 'Poolside Grill & Bar', category: 'dining', price: 35.0, rating: 4.3, description: 'Casual poolside dining with grilled favorites.', imageUrl: '/mock/dining-grill.jpg' },
  { id: 'act-006', name: 'Chef\'s Table Experience', category: 'dining', price: 200.0, rating: 5.0, description: 'An intimate dining experience with the executive chef.', imageUrl: '/mock/dining-chef.jpg' },
  { id: 'act-007', name: 'Deep Tissue Massage', category: 'spa', price: 110.0, rating: 4.6, description: '60-minute deep tissue massage session.', imageUrl: '/mock/spa-massage.jpg' },
  { id: 'act-008', name: 'Couples Spa Retreat', category: 'spa', price: 250.0, rating: 4.9, description: 'A full spa package for two, including facials and massage.', imageUrl: '/mock/spa-couples.jpg' },
  { id: 'act-009', name: 'Hot Stone Therapy', category: 'spa', price: 130.0, rating: 4.4, description: '75-minute hot stone therapy session.', imageUrl: '/mock/spa-stone.jpg' },
  { id: 'act-010', name: 'Oceanfront Suite Upgrade', category: 'room', price: 180.0, rating: 4.8, description: 'Upgrade to an oceanfront suite with private balcony.', imageUrl: '/mock/room-suite.jpg' },
  { id: 'act-011', name: 'Family Villa Upgrade', category: 'room', price: 240.0, rating: 4.7, description: 'Upgrade to a two-bedroom villa with kitchenette.', imageUrl: '/mock/room-villa.jpg' },
  { id: 'act-012', name: 'Honeymoon Suite Upgrade', category: 'room', price: 300.0, rating: 5.0, description: 'Upgrade to the honeymoon suite with private plunge pool.', imageUrl: '/mock/room-honeymoon.jpg' },
  { id: 'act-013', name: 'Jet Ski Rental', category: 'excursion', price: 75.0, rating: 4.2, description: 'One-hour jet ski rental with safety briefing.', imageUrl: '/mock/jetski.jpg' },
  { id: 'act-014', name: 'Breakfast in Bed Package', category: 'dining', price: 45.0, rating: 4.5, description: 'Daily breakfast delivered to your room.', imageUrl: '/mock/dining-breakfast.jpg' },
];
