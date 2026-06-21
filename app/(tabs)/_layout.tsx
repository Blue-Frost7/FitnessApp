import { Tabs, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../data/firebase';

export default function TabLayout() {
  const router = useRouter();

  // Global Auth Guard: Handles access for ALL tabs at once
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/Login'); // Boot to login ONLY if they actually logged out
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#050505',
          borderTopWidth: 1,
          borderTopColor: '#111',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#00F2FF',
        tabBarInactiveTintColor: '#444',
      }}
    >
      {/* TAB 1: HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'THE GATE',
        }}
      />

      {/* TAB 2: REPORTS */}
      <Tabs.Screen
        name="reports"
        options={{
          title: 'ARCHIVES',
        }}
      />

      {/* TAB 3: ACCOUNT & SYSTEM MENU */}
      <Tabs.Screen
        name="account"
        options={{
          title: 'SYSTEM',
        }}
      />

      {/* HIDE OLD TABS */}
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="calendar" options={{ href: null }} />
    </Tabs>
  );
}
