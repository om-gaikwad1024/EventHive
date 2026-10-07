import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView, Share, Dimensions
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { Ticket } from '../../types';

const { width } = Dimensions.get('window');

export const TicketScreen = ({ route, navigation }: any) => {
  const { ticket }: { ticket: Ticket } = route.params;

  const handleShare = () => {
    Share.share({
      message: `🎫 I'm going to ${ticket.eventTitle} at ${ticket.venue} on ${ticket.date}! Grabbed my ticket via EventHive BLR 🐝`
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Ticket 🎫</Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={22} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.ticketCard}>
          <View style={styles.ticketTop}>
            <View style={styles.gradientBand} />
            <Text style={styles.eventTitle}>{ticket.eventTitle}</Text>
            <Text style={styles.eventVenue}>{ticket.venue}</Text>

            <View style={styles.ticketDivider}>
              <View style={styles.notchLeft} />
              <View style={styles.dashedLine} />
              <View style={styles.notchRight} />
            </View>

            <View style={styles.infoRow}>
              {[
                { label: 'Date', value: ticket.date },
                { label: 'Time', value: `${ticket.time} IST` },
                { label: 'Category', value: ticket.category },
                { label: 'Type', value: ticket.type === 'guestlist' ? 'Guestlist' : 'General' },
              ].map(({ label, value }) => (
                <View key={label} style={styles.infoCell}>
                  <Text style={styles.infoLabel}>{label}</Text>
                  <Text style={styles.infoValue}>{value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.ticketDivider}>
              <View style={styles.notchLeft} />
              <View style={styles.dashedLine} />
              <View style={styles.notchRight} />
            </View>

            <View style={styles.qrSection}>
              <QRCode
                value={ticket.qrCode}
                size={width * 0.45}
                backgroundColor="transparent"
                color="#FFFFFF"
              />
              <Text style={styles.qrCode}>{ticket.qrCode.split('-').slice(0, 2).join('-')}</Text>
              <Text style={styles.qrHint}>Show at entry</Text>
            </View>
          </View>
        </View>

        <View style={styles.priceTag}>
          <Text style={styles.pricePaid}>
            {ticket.price === 0 ? '🎟️ Complimentary' : `₹${ticket.price} paid`}
          </Text>
          <View style={styles.priceDot} />
          <Text style={styles.priceStatus}>✓ Confirmed</Text>
        </View>

        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.homeBtnText}>Back to EventHive →</Text>
        </TouchableOpacity>
      </ScrollView>
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
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  scroll: { padding: 20, paddingBottom: 40 },
  ticketCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A4E',
  },
  ticketTop: { padding: 24, alignItems: 'center' },
  gradientBand: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: '#7C3AED',
  },
  eventTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginTop: 8,
  },
  eventVenue: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  ticketDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '110%',
    marginVertical: 20,
  },
  notchLeft: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0A0A0F',
    marginLeft: -10,
  },
  notchRight: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0A0A0F',
    marginRight: -10,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#2A2A4E',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    width: '100%',
  },
  infoCell: { alignItems: 'center', width: '40%' },
  infoLabel: { color: '#6B7280', fontSize: 11, fontWeight: '600', letterSpacing: 0.5 },
  infoValue: { color: '#FFF', fontSize: 14, fontWeight: '700', marginTop: 2 },
  qrSection: { alignItems: 'center', paddingBottom: 8 },
  qrCode: { color: '#4B5563', fontSize: 11, marginTop: 12, fontFamily: 'monospace', letterSpacing: 1 },
  qrHint: { color: '#7C3AED', fontSize: 12, fontWeight: '600', marginTop: 4 },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  pricePaid: { color: '#9CA3AF', fontSize: 14 },
  priceDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#4B5563' },
  priceStatus: { color: '#06D6A0', fontSize: 14, fontWeight: '700' },
  homeBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  homeBtnText: { color: '#FFF', fontWeight: '800', fontSize: 15 },
});