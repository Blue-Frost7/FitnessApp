import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  // Hardcoded MVP Leaderboard data
  const topHunters = [
    { rank: "1", name: "ShadowMonarch", level: "LV 99", class: "Necromancer", points: "12,450 XP" },
    { rank: "2", name: "IronFist_99", level: "LV 42", class: "Striker", points: "5,200 XP" },
    { rank: "3", name: "Phoenix_Heals", level: "LV 38", class: "Healer", points: "4,150 XP" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Guild Hall</Text>
      <Text style={styles.subtitle}>Compete with other hunters and join co-op raids</Text>

      {/* Global Leaderboard Section */}
      <Text style={styles.sectionHeader}>🏆 Top Active Hunters</Text>
      <View style={styles.leaderboardCard}>
        {topHunters.map((hunter, index) => (
          <View key={index} style={styles.hunterRow}>
            <Text style={styles.rankText}>#{hunter.rank}</Text>
            <View style={styles.hunterInfo}>
              <Text style={styles.hunterName}>{hunter.name}</Text>
              <Text style={styles.hunterClass}>{hunter.class} • {hunter.level}</Text>
            </View>
            <Text style={styles.hunterPoints}>{hunter.points}</Text>
          </View>
        ))}
      </View>

      {/* Locked Feature Section */}
      <Text style={styles.sectionHeader}>⚔️ Available Co-op Raids</Text>
      <View style={styles.lockedCard}>
        <Text style={styles.lockIcon}>🔒</Text>
        <Text style={styles.lockedTitle}>Raids Locked</Text>
        <Text style={styles.lockedDesc}>
          Multiplayer dungeons unlock once you establish your core hunter registry.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00F2FF',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 30,
    marginTop: 5,
  },
  sectionHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  leaderboardCard: {
    backgroundColor: '#111',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
    padding: 10,
    marginBottom: 30,
  },
  hunterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  rankText: {
    color: '#00F2FF',
    fontSize: 16,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
  },
  hunterInfo: {
    flex: 1,
    marginLeft: 10,
  },
  hunterName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  hunterClass: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  hunterPoints: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  lockedCard: {
    backgroundColor: '#111',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
    borderStyle: 'dashed',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  lockedTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  lockedDesc: {
    color: '#555',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
});
