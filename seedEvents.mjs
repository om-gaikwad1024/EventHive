import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const events = [
  
  {
    id: '2',
    title: 'Sunburn Garden — Bangalore',
    artist: 'Various Artists',
    venue: 'Palace Grounds',
    location: 'Mehkri Circle, Bangalore',
    date: '22 Mar, 2026',
    time: '14:00',
    price: 1499,
    category: 'Festival',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800',
    description: 'Three stages, 20+ artists, food trucks and art installations.',
    trending: true,
    sellingFast: false,
    guestlistAvailable: false,
    totalTickets: 5000,
    soldTickets: 2100,
    lat: 13.0002,
    lng: 77.5854,
    tags: ['Festival', 'EDM', 'Multi-stage']
  },
  {
    id: '3',
    title: 'React Bangalore Meetup #47',
    venue: 'WeWork Galaxy',
    location: 'Residency Road, Bangalore',
    date: '8 Mar, 2026',
    time: '10:00',
    price: 0,
    category: 'Meetup',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    description: 'Monthly React deep-dive. State management, Server Components, live coding.',
    trending: false,
    sellingFast: false,
    guestlistAvailable: true,
    totalTickets: 200,
    soldTickets: 145,
    lat: 12.9719,
    lng: 77.5937,
    tags: ['Tech', 'React', 'Free']
  },
  {
    id: '4',
    title: 'Brew & Beats — Sunday Brunch',
    venue: 'Toit Brewpub',
    location: 'Indiranagar, Bangalore',
    date: '9 Mar, 2026',
    time: '11:00',
    price: 599,
    category: 'Brunch',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    description: 'Craft beers, live jazz, unlimited brunch buffet at Bangalore best microbrewery.',
    trending: false,
    sellingFast: true,
    guestlistAvailable: true,
    totalTickets: 80,
    soldTickets: 72,
    lat: 12.9784,
    lng: 77.6408,
    tags: ['Brunch', 'Live Music', 'Beer']
  },
  {
    id: '5',
    title: 'UI/UX Design Bootcamp',
    venue: 'NASSCOM CoE',
    location: 'Koramangala, Bangalore',
    date: '12 Mar, 2026',
    time: '09:00',
    price: 299,
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    description: '6-hour Figma, design systems, and UX research. Certificate provided.',
    trending: false,
    sellingFast: false,
    guestlistAvailable: false,
    totalTickets: 50,
    soldTickets: 18,
    lat: 12.9340,
    lng: 77.6101,
    tags: ['Design', 'Workshop', 'Figma']
  },
  {
    id: '6',
    title: 'Prateek Kuhad — Silhouettes',
    artist: 'Prateek Kuhad',
    venue: 'Phoenix Marketcity Amphitheatre',
    location: 'Whitefield, Bangalore',
    date: '28 Mar, 2026',
    time: '19:30',
    price: 1299,
    category: 'Concert',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    description: 'Intimate evening of folk-pop, storytelling, and songs that hit at 2am.',
    trending: true,
    sellingFast: true,
    guestlistAvailable: false,
    totalTickets: 800,
    soldTickets: 780,
    lat: 12.9698,
    lng: 77.7499,
    tags: ['Folk', 'Indie', 'Acoustic']
  }
];

async function seed() {
  for (const event of events) {
    const { id, ...data } = event;
    await setDoc(doc(db, 'events', id), data);
    console.log(`✅ Seeded: ${event.title}`);
  }
  console.log('🐝 Done! All 6 events in Firestore.');
  process.exit(0);
}

seed().catch(console.error);