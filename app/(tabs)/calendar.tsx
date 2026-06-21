import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CalendarScreen() {
  // Hardcoded MVP data simulating your past training history (Dungeon Logs)
  const historyLogs = [
    { date: "Today, June 21", status: "In Progress", cleared: 1, total: 3, color: '#00F2FF' },
    { date: "Yesterday, June 20", status: "DUNGEON CLEARED", cleared: 3, total: 3, color: '#00FF66' },
    { date: "Friday, June 19", status: "DUNGEON CLEARED", cleared: 3, total: 3, color: '#00FF66' },
    { date: "Thursday, June 18", status: "FAILED", cleared: 0, total: 3, color: '#FF3333' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Dungeon History</Text>
      <Text style={styles.subtitle}>Track your past daily quest completions</Text>

      {historyLogs.map((log, index) => (
        <View key={index} style={styles.logCard}>
          <View style={styles.logHeader}>
            <Text style={styles.dateText}>{log.date}</Text>
            <Text style={[styles.statusBadge, { color: log.color }]}>{log.status}</Text>
          </View>
          
          <Text style={styles.detailsText}>
            Quests Completed: <Text style={styles.highlight}>{log.cleared} / {log.total}</Text>
          </Text>
        </View>
      ))}
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
  logCard: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 15,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  detailsText: {
    color: '#aaa',
    fontSize: 14,
  },
  highlight: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
