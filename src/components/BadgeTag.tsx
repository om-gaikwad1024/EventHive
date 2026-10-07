import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  type: 'trending' | 'selling' | 'free' | 'guestlist';
}

const colors = {
  trending: { bg: '#7C3AED22', text: '#A855F7', border: '#7C3AED' },
  selling: { bg: '#EF444422', text: '#F87171', border: '#EF4444' },
  free: { bg: '#06D6A022', text: '#06D6A0', border: '#06D6A0' },
  guestlist: { bg: '#F59E0B22', text: '#FBBF24', border: '#F59E0B' },
};

export const BadgeTag = ({ label, type }: Props) => {
  const c = colors[type];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg, borderColor: c.border }]}>
      <Text style={[styles.text, { color: c.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  }
});