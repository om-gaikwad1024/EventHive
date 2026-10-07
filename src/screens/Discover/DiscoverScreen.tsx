import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../../hooks/useEvents';

export const DiscoverScreen = ({ navigation }: any) => {
  const { events } = useEvents();
  const [view, setView] = useState<'map' | 'list'>('map');

  const markers = events.map(e => ({
    lat: e.lat, lng: e.lng,
    title: e.title,
    price: e.price === 0 ? 'FREE' : `₹${e.price}`,
    id: e.id
  }));

  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; background: #0A0A0F; }
        #map { height: 100vh; width: 100vw; }
        .custom-pin {
          background: #7C3AED;
          color: white;
          padding: 4px 8px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 12px;
          border: 2px solid white;
          white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', { zoomControl: true }).setView([12.9716, 77.5946], 12);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap © CARTO'
        }).addTo(map);

        var events = ${JSON.stringify(markers)};
        events.forEach(function(e) {
          var icon = L.divIcon({
            className: '',
            html: '<div class="custom-pin">' + e.price + '</div>',
            iconAnchor: [20, 10]
          });
          L.marker([e.lat, e.lng], { icon: icon })
            .addTo(map)
            .bindPopup('<b>' + e.title + '</b><br>' + e.price);
        });
      </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Bangalore</Text>
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, view === 'map' && styles.toggleActive]}
            onPress={() => setView('map')}
          >
            <Ionicons name="map" size={16} color={view === 'map' ? '#FFF' : '#6B7280'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, view === 'list' && styles.toggleActive]}
            onPress={() => setView('list')}
          >
            <Ionicons name="list" size={16} color={view === 'list' ? '#FFF' : '#6B7280'} />
          </TouchableOpacity>
        </View>
      </View>

      {view === 'map' ? (
        <WebView
          source={{ html: mapHTML }}
          style={{ flex: 1 }}
          javaScriptEnabled
          originWhitelist={['*']}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.listView}>
          {events.map(event => (
            <TouchableOpacity
              key={event.id}
              style={styles.listItem}
              onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
            >
              <View style={styles.listDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{event.title}</Text>
                <Text style={styles.listMeta}>{event.venue} · {event.date}</Text>
              </View>
              <Text style={styles.listPrice}>
                {event.price === 0 ? 'FREE' : `₹${event.price}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
  },
  title: { color: '#FFF', fontSize: 22, fontWeight: '800' },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
    borderRadius: 10,
    padding: 3,
    gap: 3,
  },
  toggleBtn: { padding: 8, borderRadius: 8 },
  toggleActive: { backgroundColor: '#7C3AED' },
  listView: { padding: 16 },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A2E',
    gap: 12,
  },
  listDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#7C3AED' },
  listTitle: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  listMeta: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  listPrice: { color: '#06D6A0', fontWeight: '800' },
});