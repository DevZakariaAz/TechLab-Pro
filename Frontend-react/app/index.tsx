import { Link } from 'expo-router';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/ThemedView';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Ministry Banner */}
      <Image
        source={require('@/assets/images/ministry_banner.png')} 
        style={styles.banner}
        resizeMode="contain"
      />

      {/* Microscope Logo */}
      <Image
        source={require('@/assets/images/microscope.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title and Subtitle */}
      <Text style={styles.title}>TechLab Pro</Text>
      <Text style={styles.subtitle}>C'est parti !</Text>
      <Text style={styles.description}>
        Connectez-vous pour profiter des{'\n'}fonctionnalités que nous avons fournies
      </Text>

      {/* Buttons */}
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Se connecter</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/register" asChild>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  banner: {
    width: '100%',
    height: 50,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#014737',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#1AA39D',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: '#1AA39D',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  secondaryButtonText: {
    color: '#1AA39D',
    fontWeight: '600',
    fontSize: 16,
  },
});
