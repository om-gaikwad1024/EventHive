export interface Event {
  id: string;
  title: string;
  artist?: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  price: number;
  category: 'Concert' | 'Festival' | 'Meetup' | 'Workshop' | 'Brunch' | 'Pub';
  image: string;
  description: string;
  trending?: boolean;
  sellingFast?: boolean;
  guestlistAvailable?: boolean;
  totalTickets: number;
  soldTickets: number;
  lat: number;
  lng: number;
  tags: string[];
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  eventTitle: string;
  venue: string;
  date: string;
  time: string;
  category: string;
  qrCode: string;
  purchasedAt: string;
  type: 'paid' | 'guestlist';
  price: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  location: string;
}