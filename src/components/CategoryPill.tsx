import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  active: boolean;
  onPress: () => void;
}

export const CategoryPill = ({ label, active, onPress }: Props) => (
  <TouchableOpacity
    style={[styles.pill, active && styles.active]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#2A2A4E',
    marginRight: 8,
  },
  active: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  text: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
  },
  activeText: {
    color: '#FFFFFF',
  }
});