import React, { useState } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Alert, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BadgeTag } from '../../components/BadgeTag';
import { useEvent } from '../../hooks/useEvents';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const { height } = Dimensions.get('window');

export const EventDetailScreen = ({ route, navigation }: any) => {
  const { eventId } = route.params;
  const { event } = useEvent(eventId);
  const { user } = useAuth();
  const [buying, setBuying] = useState(false);
  const [ticketType, setTicketType] = useState<'paid' | 'guestlist'>('paid');

  if (!event) return null;

  const soldPercent = (event.soldTickets / event.totalTickets) * 100;

  const handleBuyTicket = async () => {
    if (!user) return Alert.alert('Login required');
    setBuying(true);
    try {
      const ticket = {
        eventId: event.id,
        userId: user.uid,
        eventTitle: event.title,
        venue: event.venue,
        date: event.date,
        time: event.time,
        category: event.category,
        qrCode: `EHBLR-${event.id}-${user.uid}-${Date.now()}`,
        purchasedAt: new Date().toISOString(),
        type: ticketType,
        price: ticketType === 'guestlist' ? 0 : event.price,
      };
      const ref = await addDoc(collection(db, 'tickets'), ticket);
      navigation.navigate('Ticket', { ticketId: ref.id, ticket });
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
    setBuying(false);
  };

  const handleGuestlist = async () => {
    setTicketType('guestlist');
    await handleBuyTicket();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.image} />
          <View style={styles.imageOverlay} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <Ionicons name="share-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.badgeRow}>
            {event.trending && <BadgeTag label="🔥 Trending" type="trending" />}
            {event.sellingFast && <BadgeTag label="⚡ Selling Fast" type="selling" />}
            {event.guestlistAvailable && <BadgeTag label="Guestlist Open" type="guestlist" />}
            {event.price === 0 && <BadgeTag label="FREE" type="free" />}
          </View>

          <Text style={styles.title}>{event.title}</Text>
          {event.artist && <Text style={styles.artist}>by {event.artist}</Text>}

          <View style={styles.infoGrid}>
            {[
              { icon: 'location-outline', label: 'Venue', value: event.venue },
              { icon: 'calendar-outline', label: 'Date', value: event.date },
              { icon: 'time-outline', label: 'Time', value: `${event.time} IST` },
              { icon: 'grid-outline', label: 'Category', value: event.category },
            ].map(({ icon, label, value }) => (
              <View style={styles.infoItem} key={label}>
                <Ionicons name={icon as any} size={18} color="#7C3AED" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.infoLabel}>{label}</Text>
                  <Text style={styles.infoValue}>{value}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Availability</Text>
              <Text style={styles.progressCount}>
                {event.totalTickets - event.soldTickets} left
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${soldPercent}%` }]} />
            </View>
          </View>

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.tagsRow}>
            {event.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Price</Text>
          <Text style={styles.footerPrice}>
            {event.price === 0 ? 'FREE' : `₹${event.price}`}
          </Text>
        </View>
        <View style={styles.footerBtns}>
          {event.guestlistAvailable && (
            <TouchableOpacity
              style={styles.guestlistBtn}
              onPress={handleGuestlist}
              disabled={buying}
            >
              <Text style={styles.guestlistBtnText}>Guestlist</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.buyBtn}
            onPress={handleBuyTicket}
            disabled={buying}
          >
            <Text style={styles.buyBtnText}>
              {buying ? 'Processing...' : event.price === 0 ? 'RSVP Free →' : 'Buy Ticket →'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F',paddingTop: 20, },
  imageContainer: { height: 280, position: 'relative' },
  image: { width: '100%', height: '100%' },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,15,0.4)',
    
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 8,
  },
  shareBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 8,
  },
  content: { padding: 20, paddingBottom: 120 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '900', color: '#FFF', letterSpacing: -0.5 },
  artist: { color: '#7C3AED', fontSize: 14, fontWeight: '600', marginTop: 4 },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#2A2A4E',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  infoLabel: { color: '#6B7280', fontSize: 11, fontWeight: '600' },
  infoValue: { color: '#FFF', fontSize: 13, fontWeight: '700', marginTop: 1 },
  progressSection: { marginTop: 20 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { color: '#9CA3AF', fontSize: 13 },
  progressCount: { color: '#06D6A0', fontSize: 13, fontWeight: '700' },
  progressBar: {
    height: 6,
    backgroundColor: '#1A1A2E',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 3,
  },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', marginTop: 24, marginBottom: 8 },
  description: { color: '#9CA3AF', fontSize: 14, lineHeight: 22 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  tag: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A4E',
  },
  tagText: { color: '#7C3AED', fontSize: 12, fontWeight: '600' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0A0A0F',
    borderTopWidth: 1,
    borderTopColor: '#1A1A2E',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLabel: { color: '#6B7280', fontSize: 12 },
  footerPrice: { color: '#06D6A0', fontSize: 22, fontWeight: '900' },
  footerBtns: { flexDirection: 'row', gap: 10 },
  guestlistBtn: {
    borderWidth: 1.5,
    borderColor: '#7C3AED',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  guestlistBtnText: { color: '#7C3AED', fontWeight: '700', fontSize: 13 },
  buyBtn: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
  },
  buyBtnText: { color: '#FFF', fontWeight: '800', fontSize: 14 },
});