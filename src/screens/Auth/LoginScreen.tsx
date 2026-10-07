import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Fill all fields');
    setLoading(true);
    try {
      await login(email, password);
    } catch (e: any) {
      Alert.alert('Login failed', e.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.logo}>EventHive</Text>
          <Text style={styles.logoSub}>BLR 🐝</Text>
          <Text style={styles.tagline}>Your city. Your vibe.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@cool.com"
            placeholderTextColor="#4B5563"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#4B5563"
            secureTextEntry
          />

          <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
            <Text style={styles.btnText}>{loading ? 'Logging in...' : 'Login →'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.switchRow}>
            <Text style={styles.switchText}>No account? <Text style={styles.switchLink}>Sign up free</Text></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  inner: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { marginBottom: 40, alignItems: 'center' },
  logo: { fontSize: 40, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1 },
  logoSub: { fontSize: 28, marginTop: -8 },
  tagline: { color: '#6B7280', fontSize: 16, marginTop: 8 },
  form: {},
  label: { color: '#9CA3AF', fontSize: 13, fontWeight: '600', marginBottom: 8, marginTop: 16, letterSpacing: 0.5 },
  input: {
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2A2A4E',
  },
  btn: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginTop: 28,
  },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  switchRow: { alignItems: 'center', marginTop: 20 },
  switchText: { color: '#6B7280', fontSize: 14 },
  switchLink: { color: '#7C3AED', fontWeight: '700' },
});