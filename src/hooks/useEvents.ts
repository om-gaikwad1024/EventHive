import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Event } from '../types';

export const useEvents = (category?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const ref = collection(db, 'events');
        const q = category
          ? query(ref, where('category', '==', category))
          : query(ref);
        const snap = await getDocs(q);
        setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() } as Event)));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetch();
  }, [category]);

  return { events, loading };
};

export const useEvent = (id: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, 'events', id));
      if (snap.exists()) setEvent({ id: snap.id, ...snap.data() } as Event);
      setLoading(false);
    };
    fetch();
  }, [id]);

  return { event, loading };
};