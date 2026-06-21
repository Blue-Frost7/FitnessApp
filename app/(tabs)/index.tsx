import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'; // Changed getDoc to onSnapshot
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../data/firebase';
import { calculateSystemPenalties } from '../../data/penaltyEngine';
import { getSystemRankData } from '../../data/systemTheme';

const getQuestsForRank = (rank: string) => {
  switch (rank) {
    case 'D-RANK':
      return [
        { id: '1', text: 'Pike Pushups: 1 to 5 reps', done: false, xp: 10 },
        { id: '2', text: 'Jumping Ropes: 40 skips', done: false, xp: 10 },
        { id: '3', text: 'Diamond Pushups: 1 to 5 reps', done: false, xp: 10 },
        { id: '4', text: 'Full Squats: 1 to 9 reps', done: false, xp: 10 },
        { id: '5', text: 'Regular Push-ups: 1 to 5 reps', done: false, xp: 10 },
        { id: '6', text: 'Dead Hang: 10 seconds', done: false, xp: 10 },
        { id: '7', text: 'Wide Arm Push-ups: 1 to 5 reps', done: false, xp: 10 },
        { id: '8', text: 'Sit-ups: 1 to 5 reps', done: false, xp: 10 },
        { id: '9', text: 'Crunches: 1 to 5 reps', done: false, xp: 10 },
        { id: '10', text: 'Pull-ups: 1 to 5 reps', done: false, xp: 10 },
      ];
    case 'C-RANK':
      return [
        { id: '1', text: 'Pike Pushups: 5 to 10 reps', done: false, xp: 20 },
        { id: '2', text: 'Jumping Ropes: 80 skips', done: false, xp: 20 },
        { id: '3', text: 'Diamond Pushups: 5 to 10 reps', done: false, xp: 20 },
        { id: '4', text: 'Full Squats: 9 to 19 reps', done: false, xp: 20 },
        { id: '5', text: 'Regular Push-ups: 5 to 10 reps', done: false, xp: 20 },
        { id: '6', text: 'Dead Hang: 20 seconds', done: false, xp: 20 },
        { id: '7', text: 'Wide Arm Push-ups: 5 to 10 reps', done: false, xp: 20 },
        { id: '8', text: 'Sit-ups: 5 to 10 reps', done: false, xp: 20 },
        { id: '9', text: 'Crunches: 5 to 10 reps', done: false, xp: 20 },
        { id: '10', text: 'Pull-ups: 5 to 10 reps', done: false, xp: 20 },
      ];
    default:
      return [{ id: '1', text: 'Regular Push-ups: 5 to 10 reps', done: false, xp: 20 }];
  }
};

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('Hunter');
  const [level, setLevel] = useState(1);
  const [originalLevel, setOriginalLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [quests, setQuests] = useState<any[]>([]);
  const [penaltyDays, setPenaltyDays] = useState(0);
  const [penaltyActive, setPenaltyActive] = useState(false);

  const systemTheme = getSystemRankData(level);

  useEffect(() => {
    let unsubscribeSnapshot = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        // Establish a live listener pipeline to Firestore
        unsubscribeSnapshot = onSnapshot(docRef, async (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const engine = calculateSystemPenalties(data);

            setLevel(engine.currentLevel);
            setOriginalLevel(engine.originalLevel);
            setXp(data.xp || 0);
            setUsername(data.username || 'Hunter');
            setPenaltyDays(engine.daysMissed);
            setPenaltyActive(engine.isDemoted);

            if (engine.currentLevel !== data.level || engine.originalLevel !== data.originalLevel) {
              await updateDoc(docRef, {
                level: engine.currentLevel,
                originalLevel: engine.originalLevel
              });
            }

            const rankName = getSystemRankData(engine.currentLevel).rank;
            setQuests(getQuestsForRank(rankName));
          }
          setLoading(false);
        }, (error) => {
          console.error("Live sync failed:", error);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  const toggleQuest = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const todayISO = new Date().toISOString();

    const updatedQuests = quests.map(q => {
      if (q.id === id && !q.done) {
        let nextLevel = level;
        let nextOriginal = originalLevel;
        let absoluteXp = xp + q.xp;

        if (penaltyActive && penaltyDays < 16) {
          nextLevel = originalLevel;
          setPenaltyActive(false);
          Alert.alert("SYSTEM RESTORED", "Workout verified within operational window. Level parameters restored to baseline capacity!");
        }

        if (absoluteXp >= 100) {
          nextLevel += 1;
          nextOriginal = nextLevel;
          absoluteXp -= 100;
        }

        updateDoc(doc(db, "users", user.uid), {
          level: nextLevel,
          originalLevel: nextOriginal,
          xp: absoluteXp,
          lastWorkoutDate: todayISO
        });

        setXp(absoluteXp);
        setLevel(nextLevel);
        setOriginalLevel(nextOriginal);
        return { ...q, done: true };
      }
      return q;
    });

    setQuests(updatedQuests);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00F2FF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {penaltyActive && (
        <View style={styles.penaltyBanner}>
          <Text style={styles.penaltyAlertTitle}>🚨 SYSTEM WARNING: PENALTY ENFORCED</Text>
          <Text style={styles.penaltyAlertDesc}>
            Inactivity detected for <Text style={styles.boldRed}>{penaltyDays} days</Text>. Your combat efficiency parameters have been actively degraded. Complete any quest immediately to clear the penalty zone status!
          </Text>
        </View>
      )}

      <View style={[styles.headerCard, { borderColor: systemTheme.color, backgroundColor: systemTheme.bgIntensity }]}>
        <Text style={styles.systemAlert}>SYSTEM PROFILE ACTIVE</Text>
        <Text style={styles.hunterName}>{username}</Text>
        
        <View style={styles.statsRow}>
          <Text style={styles.statLabel}>RANK: <Text style={{ color: systemTheme.color, fontWeight: 'bold' }}>{systemTheme.rank}</Text></Text>
          <Text style={styles.statLabel}>LEVEL: <Text style={{ color: '#fff', fontWeight: 'bold' }}>{level}</Text></Text>
          <Text style={styles.statLabel}>XP: <Text style={{ color: systemTheme.color, fontWeight: 'bold' }}>{xp}/100</Text></Text>
        </View>
      </View>

      <View style={styles.shadowPanel}>
        <Text style={styles.sectionTitle}>ACTIVE SUMMON</Text>
        <Text style={[styles.shadowName, { color: systemTheme.color }]}>{systemTheme.shadowName}</Text>
        
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>"{systemTheme.quote}"</Text>
          <Text style={[styles.targetBossText, { color: systemTheme.color }]}>CURRENT TARGET: ALLY DEFEAT {systemTheme.targetBoss}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>DAILY DUNGEON QUESTS</Text>
      {quests.map((quest) => (
        <TouchableOpacity
          key={quest.id}
          style={[styles.questCard, quest.done && styles.questCardDone]}
          onPress={() => toggleQuest(quest.id)}
          activeOpacity={quest.done ? 1 : 0.7}
        >
          <View style={[styles.checkbox, quest.done && { backgroundColor: systemTheme.color, borderColor: systemTheme.color }]}>
            {quest.done && <Text style={styles.checkIcon}>✓</Text>}
          </View>
          <Text style={[styles.questText, quest.done && styles.questTextDone]}>
            {quest.text}
          </Text>
          {!quest.done && <Text style={[styles.xpReward, { color: systemTheme.color }]}>+{quest.xp}XP</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  content: { padding: 20, paddingTop: 60 },
  center: { justifyContent: 'center', alignItems: 'center' },
  penaltyBanner: { backgroundColor: '#200003', borderWidth: 1, borderColor: '#FF334B', padding: 15, borderRadius: 8, marginBottom: 20 },
  penaltyAlertTitle: { color: '#FF334B', fontWeight: 'bold', fontSize: 13, letterSpacing: 1, marginBottom: 4 },
  penaltyAlertDesc: { color: '#aaa', fontSize: 12, lineHeight: 18 },
  boldRed: { color: '#FF334B', fontWeight: 'bold' },
  headerCard: { padding: 20, borderRadius: 10, borderWidth: 1, marginBottom: 25 },
  systemAlert: { fontSize: 10, fontWeight: 'bold', color: '#666', letterSpacing: 2, marginBottom: 5 },
  hunterName: { fontSize: 28, fontWeight: 'bold', color: '#fff', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 15 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statLabel: { color: '#aaa', fontSize: 13, letterSpacing: 0.5 },
  sectionTitle: { color: '#555', fontSize: 12, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' },
  shadowPanel: { backgroundColor: '#111', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#222', marginBottom: 25 },
  shadowName: { fontSize: 22, fontWeight: 'bold', letterSpacing: 1, marginBottom: 10 },
  quoteBox: { marginTop: 5, borderLeftWidth: 2, borderLeftColor: '#333', paddingLeft: 12 },
  quoteText: { color: '#888', fontSize: 13, fontStyle: 'italic', lineHeight: 18 },
  targetBossText: { fontSize: 10, fontWeight: 'bold', marginTop: 8, letterSpacing: 1, textTransform: 'uppercase' },
  questCard: { backgroundColor: '#111', flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 6, marginBottom: 10, borderWidth: 1, borderColor: '#1a1a1a' },
  questCardDone: { opacity: 0.4, borderColor: '#000' },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1, borderColor: '#444', marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  checkIcon: { color: '#000', fontSize: 12, fontWeight: 'bold' },
  questText: { color: '#eee', fontSize: 14, flex: 1 },
  questTextDone: { textDecorationLine: 'line-through', color: '#666' },
  xpReward: { fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5 }
});