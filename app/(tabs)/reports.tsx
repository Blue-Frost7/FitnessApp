import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../data/firebase';

export default function ReportsScreen() {
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.level) setLevel(data.level);
            if (data.xp) setXp(data.xp);
          }
        } catch (error) {
          console.error("Error fetching analytics:", error);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Simple dynamic logic to determine Hunter Rank based on Level
  const getHunterRank = (lvl: number) => {
    if (lvl >= 20) return "S-Rank";
    if (lvl >= 15) return "A-Rank";
    if (lvl >= 10) return "B-Rank";
    if (lvl >= 5) return "C-Rank";
    return "E-Rank"; // Default starter rank
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00F2FF" />
      </View>
    );
  }

  const performanceStats = [
    { label: "Current Level", value: `LV ${level}`, color: '#fff' },
    { label: "Current XP Pool", value: `${xp} XP`, color: '#00F2FF' },
    { label: "Hunter Rank", value: getHunterRank(level), color: level >= 5 ? '#00FF66' : '#aaa' },
    { label: "Dungeon Status", value: "Active", color: '#00F2FF' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Hunter Analytics</Text>
      <Text style={styles.subtitle}>Comprehensive fitness assessment data</Text>

      {/* Live Stat Grid */}
      <View style={styles.grid}>
        {performanceStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
          </View>
        ))}
      </View>

      {/* Milestones Section */}
      <Text style={styles.sectionHeader}>Rank Progression</Text>
      <View style={styles.achievementRow}>
        <Text style={styles.badgeIcon}>⚡</Text>
        <View style={styles.achievementTextContainer}>
          <Text style={styles.achievementTitle}>Next Rank Milestone</Text>
          <Text style={styles.achievementDesc}>
            {level >= 5 ? "Keep grinding to reach B-Rank at Level 10!" : "Reach Level 5 to awaken your powers and break out of E-Rank!"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  center: { justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20, paddingTop: 60 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#00F2FF', textTransform: 'uppercase', letterSpacing: 2 },
  subtitle: { color: '#666', fontSize: 14, marginBottom: 30, marginTop: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30 },
  statCard: { backgroundColor: '#111', width: '48%', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#222', marginBottom: 15, justifyContent: 'center' },
  statLabel: { color: '#888', fontSize: 12, marginBottom: 5, fontWeight: '600' },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  sectionHeader: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
  achievementRow: { backgroundColor: '#111', flexDirection: 'row', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#222', alignItems: 'center' },
  badgeIcon: { fontSize: 30, marginRight: 15 },
  achievementTextContainer: { flex: 1 },
  achievementTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  achievementDesc: { color: '#666', fontSize: 12, marginTop: 2 },
});