import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BadgeTag } from './BadgeTag';
import { Event } from '../types';

const { width } = Dimensions.get('window');

interface Props {
  event: Event;
  onPress: () => void;
  variant?: 'featured' | 'list';
}

export const EventCard = ({ event, onPress, variant = 'list' }: Props) => {
  const soldPercent = (event.soldTickets / event.totalTickets) * 100;

  if (variant === 'featured') {
    return (
      <TouchableOpacity style={styles.featured} onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: event.image }} style={styles.featuredImage} />
        <View style={styles.featuredOverlay} />
        <View style={styles.featuredContent}>
          <View style={styles.badgeRow}>
            {event.trending && <BadgeTag label="🔥 Trending" type="trending" />}
            {event.sellingFast && <BadgeTag label="⚡ Selling Fast" type="selling" />}
          </View>
          <Text style={styles.featuredTitle}>{event.title}</Text>
          <Text style={styles.featuredSub}>{event.venue} · {event.date}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              {event.price === 0 ? 'FREE' : `₹${event.price}`}
            </Text>
            <View style={styles.getBtn}>
              <Text style={styles.getBtnText}>Get Tickets →</Text>
            </View>
          </View>
        </View>
        <View style={styles.dateChip}>
          <Text style={styles.dateDay}>{event.date.split(' ')[0]}</Text>
          <Text style={styles.dateMon}>{event.date.split(' ')[1]?.replace(',', '')}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.listCard} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: event.image }} style={styles.listImage} />
      <View style={styles.listContent}>
        <View style={styles.badgeRow}>
          {event.trending && <BadgeTag label="🔥 Trending" type="trending" />}
          {event.price === 0 && <BadgeTag label="FREE" type="free" />}
          {event.guestlistAvailable && <BadgeTag label="Guestlist" type="guestlist" />}
        </View>
        <Text style={styles.listTitle}>{event.title}</Text>
        <Text style={styles.listMeta}>{event.venue}</Text>
        <Text style={styles.listDate}>{event.date} · {event.time}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${soldPercent}%` }]} />
        </View>
        <View style={styles.listBottom}>
          <Text style={styles.listPrice}>
            {event.price === 0 ? 'FREE' : `₹${event.price}`}
          </Text>
          <Text style={styles.spotsLeft}>
            {event.totalTickets - event.soldTickets} spots left
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  featured: {
    width: width - 32,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#1A1A2E',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    // background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  featuredSub: {
    color: '#D1D5DB',
    fontSize: 12,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  price: {
    color: '#06D6A0',
    fontSize: 18,
    fontWeight: '800',
  },
  getBtn: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  getBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  dateChip: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    // backdropFilter: 'blur(10px)',
  },
  dateDay: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  dateMon: {
    color: '#A855F7',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A4E',
  },
  listImage: {
    width: 110,
    height: 130,
  },
  listContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  listTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  listMeta: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  listDate: {
    color: '#A855F7',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#2A2A4E',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#06D6A0',
    borderRadius: 2,
  },
  listBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  listPrice: {
    color: '#06D6A0',
    fontSize: 15,
    fontWeight: '800',
  },
  spotsLeft: {
    color: '#6B7280',
    fontSize: 11,
  }
});