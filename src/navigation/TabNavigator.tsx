import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { DiscoverScreen } from '../screens/Discover/DiscoverScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: '#7C3AED',
      tabBarInactiveTintColor: '#4B5563',
      tabBarLabelStyle: styles.label,
      tabBarIcon: ({ focused, color, size }) => {
        const icons: Record<string, { active: string; inactive: string }> = {
          Home: { active: 'home', inactive: 'home-outline' },
          Discover: { active: 'map', inactive: 'map-outline' },
          Profile: { active: 'person', inactive: 'person-outline' },
        };
        const iconSet = icons[route.name];
        return (
          <Ionicons
            name={(focused ? iconSet?.active : iconSet?.inactive) as any}
            size={22}
            color={color}
          />
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Discover" component={DiscoverScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0D0D18',
    borderTopWidth: 1,
    borderTopColor: '#1A1A2E',
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
  },
  label: { fontSize: 11, fontWeight: '600' },
});