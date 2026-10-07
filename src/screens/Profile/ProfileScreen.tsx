import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Ticket } from '../../types';

export const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    if (!user) return;
    getDocs(query(collection(db, 'tickets'), where('userId', '==', user.uid)))
      .then(snap => setTickets(snap.docs.map(d => ({ id: d.id, ...d.data() } as Ticket))))
      .catch(console.error);
  }, [user]);

  const firstName = user?.displayName?.split(' ')[0] || 'Explorer';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstName[0]}</Text>
          </View>
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.name}>{user?.displayName}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <View style={styles.locationPill}>
              <Ionicons name="location" size={12} color="#7C3AED" />
              <Text style={styles.locationText}>Bangalore, IN</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { label: 'Events Attended', value: tickets.length },
            { label: 'Following', value: 12 },
            { label: 'Wishlist', value: 4 },
          ].map(({ label, value }) => (
            <View key={label} style={styles.statItem}>
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Your Tickets</Text>

        {tickets.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎫</Text>
            <Text style={styles.emptyText}>No tickets yet</Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exploreBtnText}>Explore Events →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          tickets.map(ticket => (
            <TouchableOpacity
              key={ticket.id}
              style={styles.ticketItem}
              onPress={() => navigation.navigate('Ticket', { ticketId: ticket.id, ticket })}
            >
              <View style={styles.ticketColor} />
              <View style={{ flex: 1 }}>
                <Text style={styles.ticketTitle}>{ticket.eventTitle}</Text>
                <Text style={styles.ticketMeta}>{ticket.venue} · {ticket.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#4B5563" />
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  scroll: { padding: 20, paddingBottom: 60 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 40,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFF', fontSize: 26, fontWeight: '900' },
  name: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  email: { color: '#6B7280', fontSize: 13, marginTop: 2 },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  locationText: { color: '#9CA3AF', fontSize: 11, fontWeight: '600' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#2A2A4E',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { color: '#7C3AED', fontSize: 22, fontWeight: '900' },
  statLabel: { color: '#6B7280', fontSize: 11, marginTop: 2, textAlign: 'center' },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { color: '#6B7280', fontSize: 16, marginTop: 8 },
  exploreBtn: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  exploreBtnText: { color: '#FFF', fontWeight: '700' },
  ticketItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A4E',
    gap: 12,
  },
  ticketColor: { width: 4, height: 40, borderRadius: 2, backgroundColor: '#7C3AED' },
  ticketTitle: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  ticketMeta: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EF444433',
    borderRadius: 14,
  },
  logoutText: { color: '#EF4444', fontSize: 15, fontWeight: '700' },
});