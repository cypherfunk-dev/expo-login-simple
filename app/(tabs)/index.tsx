import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/components/context';
import { Redirect, useRouter } from 'expo-router';


export default function HomeScreen() {
const { user } = useAuth();
  if(!user) {
    return <Redirect href="/(auth)/login" />;
  }
  


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
      <Image
        source={require('@/assets/images/images.jpg')}
        style={styles.reactLogo}
      />
      }>
      <ThemedView style={{ padding: 28, alignItems: 'center', gap: 12 }}>
      <ThemedText type="title">Chi cheñol</ThemedText>
      <ThemedText type="title" style={{ textAlign: 'center'}}>🐇</ThemedText>
      <ThemedText type="subtitle" style={{ textAlign: 'center', maxWidth: 520 }}>
        Es el dia del platano
      </ThemedText>

      </ThemedView>


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: '105%',
    height: undefined,
    aspectRatio: 290 / 178, // relación entre ancho y alto original
    bottom: -10,
    left: 0,
    position: 'absolute',
  },
});
