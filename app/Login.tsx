import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../data/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleAuth = () => {
    if (isRegistering) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => router.replace('/(tabs)'))
        .catch((error) => Alert.alert("Registration Failed", error.message));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => router.replace('/(tabs)'))
        .catch((error) => Alert.alert("Login Failed", error.message));
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>System Reset</Text>
        <Text style={styles.subtitle}>{isRegistering ? "Register New Warrior" : "Arise and Level Up"}</Text>

        <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#555" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#555" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isRegistering ? "CREATE ACCOUNT" : "ENTER DUNGEON"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.toggleText}>
            {isRegistering 
              ? "Already have an account? Sign in" 
              : "No account? Register your new account"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', justifyContent: 'center' },
  formContainer: { padding: 20 },
  title: { fontSize: 40, fontWeight: 'bold', color: '#00F2FF', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#aaa', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#111', color: '#fff', borderRadius: 8, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  button: { backgroundColor: 'transparent', padding: 15, borderRadius: 8, borderWidth: 2, borderColor: '#00F2FF' },
  buttonText: { color: '#00F2FF', textAlign: 'center', fontWeight: 'bold', letterSpacing: 2 },
  toggleText: { color: '#888', textAlign: 'center', marginTop: 20, textDecorationLine: 'underline' }
});