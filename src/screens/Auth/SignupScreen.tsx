import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ScrollView
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export const SignupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password) return Alert.alert('Fill all fields');
    if (password.length < 6) return Alert.alert('Password must be 6+ chars');
    setLoading(true);
    try {
      await signup(email, password, name);
    } catch (e: any) {
      Alert.alert('Signup failed', e.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.title}>Join the hive 🐝</Text>
            <Text style={styles.sub}>Bangalore's dopest event platform</Text>
          </View>

          {[
            { label: 'Full Name', value: name, setter: setName, placeholder: 'Your name', secure: false },
            { label: 'Email', value: email, setter: setEmail, placeholder: 'you@cool.com', secure: false },
            { label: 'Password', value: password, setter: setPassword, placeholder: '••••••••', secure: true },
          ].map(({ label, value, setter, placeholder, secure }) => (
            <View key={label}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={setter}
                placeholder={placeholder}
                placeholderTextColor="#4B5563"
                secureTextEntry={secure}
                autoCapitalize={label === 'Full Name' ? 'words' : 'none'}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.btn} onPress={handleSignup} disabled={loading} activeOpacity={0.85}>
            <Text style={styles.btnText}>{loading ? 'Creating account...' : 'Create Account →'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.switchRow}>
            <Text style={styles.switchText}>Have account? <Text style={styles.switchLink}>Login</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  inner: { padding: 24 },
  header: { marginBottom: 32, marginTop: 20 },
  title: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1 },
  sub: { color: '#6B7280', marginTop: 6 },
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