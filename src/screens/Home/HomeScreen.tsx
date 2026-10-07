import React, { useState } from 'react';
import {
  View, Text, ScrollView, TextInput,
  TouchableOpacity, StyleSheet, SafeAreaView, FlatList, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../hooks/useEvents';
import { EventCard } from '../../components/EventCard';
import { CategoryPill } from '../../components/CategoryPill';

const CATEGORIES = ['All', 'Concert', 'Festival', 'Meetup', 'Workshop', 'Brunch', 'Pub'];

export const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { events } = useEvents(activeCategory === 'All' ? undefined : activeCategory);

  const firstName = user?.displayName?.split(' ')[0] || 'Explorer';
  const trending = events.filter(e => e.trending);
  const all = events.filter(e => !search || e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Hey, {firstName} 👋</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color="#7C3AED" />
              <Text style={styles.location}>Bangalore, IN</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.avatarText}>{firstName[0]}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headline}>Find your{'\n'}next vibe ✨</Text>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, artists, venues..."
            placeholderTextColor="#4B5563"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {CATEGORIES.map(c => (
            <CategoryPill
              key={c}
              label={c}
              active={activeCategory === c}
              onPress={() => setActiveCategory(c)}
            />
          ))}
        </ScrollView>

        {!search && trending.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔥 Trending Now</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={trending}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={e => e.id}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              renderItem={({ item }) => (
                <EventCard
                  event={item}
                  variant="featured"
                  onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
                />
              )}
            />
          </>
        )}

        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>📍 Near You</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
            <Text style={styles.seeAll}>Map view</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {all.map(event => (
            <EventCard
              key={event.id}
              event={event}
              variant="list"
              onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  scroll: { paddingBottom: 100 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  greeting: { color: '#9CA3AF', fontSize: 13 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  location: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  headline: {
    paddingHorizontal: 16,
    marginTop: 20,
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2A2A4E',
    gap: 10,
  },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 14 },
  categories: { paddingHorizontal: 16, paddingVertical: 16 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  seeAll: { color: '#7C3AED', fontSize: 13, fontWeight: '600' },
  listContainer: { paddingHorizontal: 16, marginTop: 4 },
});