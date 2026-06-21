import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../data/firebase';

export default function AccountScreen() {
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(1);
  const [hunterClass, setHunterClass] = useState('Striker');
  const [email, setEmail] = useState('');

  const availableClasses = ['Striker', 'Assassin', 'Warrior', 'Mage'];

  useEffect(() => {
    const loadProfileData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email || '');
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.level) setLevel(data.level);
            if (data.class) setHunterClass(data.class);
          }
        } catch (error) {
          console.error("Error loading profile details:", error);
        }
      }
      setLoading(false);
    };

    loadProfileData();
  }, []);

  const changeClass = async (newClass: string) => {
    const user = auth.currentUser;
    if (!user) return;

    setHunterClass(newClass);
    try {
      await setDoc(doc(db, "users", user.uid), { class: newClass }, { merge: true });
    } catch (error) {
      console.error("Error saving hunter class:", error);
    }
  };

  // 🧪 DEV TOOL: Triggers a 5-day penalty for testing purposes
  const triggerFakePenalty = async () => {
    const user = auth.currentUser;
    if (!user) return;

    // Generate an ISO timestamp exactly 5 days ago
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        lastWorkoutDate: fiveDaysAgo.toISOString()
      }, { merge: true });
      
      Alert.alert("System Manipulated", "Last workout set to 5 days ago! Go check THE GATE tab to see the penalty in action.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to manipulate the timeline.");
    }
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Logout Error:", error.message));
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00F2FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.header}>Hunter Status</Text>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Email:</Text>
          <Text style={styles.statValue}>{email || 'Unknown'}</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Level:</Text>
          <Text style={styles.statValue}>{level}</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Current Class:</Text>
          <Text style={[styles.statValue, { color: '#00F2FF' }]}>{hunterClass}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Select Your Class</Text>
      <View style={styles.classGrid}>
        {availableClasses.map((cls) => (
          <TouchableOpacity
            key={cls}
            style={[styles.classButton, hunterClass === cls && styles.activeClassButton]}
            onPress={() => changeClass(cls)}
          >
            <Text style={[styles.classButtonText, hunterClass === cls && styles.activeClassText]}>
              {cls}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* DEV CHEAT BUTTON RENDERED HERE */}
      <TouchableOpacity style={styles.devButton} onPress={triggerFakePenalty}>
        <Text style={styles.devButtonText}>🧪 DEV: TRIGGER 5-DAY PENALTY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>EXIT DUNGEON (Logout)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', padding: 20, justifyContent: 'center' },
  center: { justifyContent: 'center', alignItems: 'center' },
  profileCard: { backgroundColor: '#111', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#333', marginBottom: 25 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#00F2FF', marginBottom: 20, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#222', paddingBottom: 5 },
  statLabel: { color: '#aaa', fontSize: 16 },
  statValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sectionHeader: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' },
  classGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 35 },
  classButton: { backgroundColor: '#111', width: '48%', padding: 12, borderRadius: 6, borderWidth: 1, borderColor: '#222', marginBottom: 10, alignItems: 'center' },
  activeClassButton: { borderColor: '#00F2FF', backgroundColor: '#002B30' },
  classButtonText: { color: '#888', fontWeight: '600', fontSize: 14 },
  activeClassText: { color: '#00F2FF', fontWeight: 'bold' },
  devButton: { backgroundColor: '#200003', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ff334b', marginBottom: 15 },
  devButtonText: { color: '#ff334b', textAlign: 'center', fontWeight: 'bold', letterSpacing: 1 },
  logoutButton: { backgroundColor: 'transparent', padding: 15, borderRadius: 8, borderWidth: 2, borderColor: '#ff3333' },
  logoutText: { color: '#ff3333', textAlign: 'center', fontWeight: 'bold', letterSpacing: 1 },
});