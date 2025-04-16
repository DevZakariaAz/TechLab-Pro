import { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Link,Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { login } from '@/api/login'; // Adjust this path as needed
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Google login setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '519763398505-f0mjd88o47n1o0otrjv08d61n3hkmr3m.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google Auth Success:', authentication);
      router.replace('/(tabs)');
    } else if (response?.type === 'error') {
      const error = response?.error;
      if (error) {
        console.log('Google Auth Error:', error);
        Alert.alert('Erreur de connexion Google', error?.message || 'Une erreur est survenue');
      }
    }
  }, [response]);

  // Normal login
  const handleLogin = () => {
    const result = login(email, password);
    if (result.success) {
      console.log('Logged in:', result.user);
      router.replace('/(tabs)');
    } else {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Se connecter",
          headerTitleAlign: "center",
          headerBackVisible: true,
        }}
      />

      <Text style={styles.title}>Se connecter</Text>

      <View style={styles.form}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Entrez votre email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Entrez votre mot de passe"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#999"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Forgot password */}
        <TouchableOpacity>
          <Text style={styles.forgot}>Mot de passe oublié?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>

        {/* Register prompt */}
        <Text style={styles.registerPrompt}>
          Vous n’avez pas de compte ?{' '}
          <Link href="/register" style={styles.registerLink}>S'inscrire</Link>
        </Text>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>OU</Text>
          <View style={styles.line} />
        </View>

        {/* Google Login Button */}
        <TouchableOpacity
          style={styles.googleButton}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Image
            source={require('@/assets/images/googleLogo.png')}
            style={styles.googleLogo}
          />
          <Text style={styles.googleText}>Connectez-vous avec Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 },
  form: { width: '100%' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 50, fontSize: 16 },
  forgot: { color: '#1AA39D', alignSelf: 'flex-end', marginBottom: 24, fontSize: 14 },
  loginButton: {
    backgroundColor: '#1AA39D',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  registerPrompt: { textAlign: 'center', fontSize: 14, marginBottom: 20 },
  registerLink: { color: '#1AA39D', fontWeight: '500' },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: { flex: 1, height: 1, backgroundColor: '#ccc' },
  or: { marginHorizontal: 8, color: '#999' },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  googleLogo: { width: 18, height: 18, marginRight: 8 },
  googleText: { fontSize: 15, color: '#333' },
});