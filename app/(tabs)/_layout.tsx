import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#00F2FF', 
      tabBarInactiveTintColor: '#999999', 
      headerStyle: { backgroundColor: '#050505' }, 
      headerTintColor: '#00F2FF', 
      headerTitleStyle: { fontWeight: 'bold' },
      tabBarStyle: { backgroundColor: '#050505', borderTopColor: '#333' }
    }}>
      <Tabs.Screen name="index" options={{ 
        title: 'Home', 
        tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> 
      }} />
      {/* <Tabs.Screen name="reports" ... />
      <Tabs.Screen name="calendar" ... />
      <Tabs.Screen name="account" ... />
      */}
    </Tabs>
  );
}