import { Slot } from 'expo-router';

import AuthProvider from '@/components/context';


export default function RootLayout() {

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
