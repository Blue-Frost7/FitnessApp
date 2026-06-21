import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../data/firebase';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // This will now point to your new app/Login.tsx file
        router.replace('/Login'); 
      }
    });
    return unsubscribe;
  }, []);

  return null; 
}