import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Animated,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CreatePasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Animation values
  const [checkmarkScale] = useState(new Animated.Value(0));
  const [modalOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    // Check if passwords match when either field changes
    if (confirmPassword.length > 0) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true);
    }

    // Check if password is valid (simple validation)
    setIsValid(password.length >= 8);
  }, [password, confirmPassword]);

  const handleCreatePassword = () => {
    if (isValid && passwordsMatch && confirmPassword.length > 0) {
      console.log('Password created successfully');
      // Show success modal
      setShowSuccessModal(true);
      
      // Animate the success modal elements
      Animated.sequence([
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(checkmarkScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleLogin = () => {
    // Close modal and navigate to login
    setShowSuccessModal(false);
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Création de mot de passe",
          headerTitleAlign: "center",
          headerBackVisible: true,
        }}
      />

      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Créer un nouveau mot{'\n'}de passe</Text>
          
          {/* Password Input */}
          <View style={[
            styles.inputContainer,
            !isValid && password.length > 0 && styles.inputError
          ]}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={password.length > 0 ? "#19A68D" : "#9CA3AF"} 
              />
            </View>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder=""
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#9CA3AF" 
              />
            </TouchableOpacity>
          </View>
          
          {/* Password strength indicator (optional) */}
          {password.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBar}>
                <View 
                  style={[
                    styles.strengthFill, 
                    { width: `${Math.min(100, password.length * 12.5)}%` },
                    isValid ? styles.strengthValid : styles.strengthInvalid
                  ]} 
                />
              </View>
              {!isValid && (
                <Text style={styles.errorText}>
                  Le mot de passe doit contenir au moins 8 caractères
                </Text>
              )}
            </View>
          )}
          
          {/* Confirm Password Input */}
          <View style={[
            styles.inputContainer,
            !passwordsMatch && styles.inputError
          ]}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={confirmPassword.length > 0 ? "#19A68D" : "#9CA3AF"} 
              />
            </View>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirmez le mot de passe"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons 
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#9CA3AF" 
              />
            </TouchableOpacity>
          </View>
          
          {/* Error message for password mismatch */}
          {!passwordsMatch && confirmPassword.length > 0 && (
            <Text style={styles.errorText}>
              Les mots de passe ne correspondent pas
            </Text>
          )}

          {/* Create Password Button */}
          <TouchableOpacity
            style={[
              styles.createButton,
              (!isValid || !passwordsMatch || confirmPassword.length === 0) && styles.buttonDisabled
            ]}
            onPress={handleCreatePassword}
            disabled={!isValid || !passwordsMatch || confirmPassword.length === 0}
          >
            <Text style={styles.createButtonText}>
              Créer un mot de passe
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <Animated.View 
          style={[
            styles.modalContainer,
            { opacity: modalOpacity }
          ]}
        >
          <View style={styles.modalContent}>
            {/* Success Icon */}
            <Animated.View 
              style={[
                styles.iconContainer,
                styles.successIconContainer,
                {
                  transform: [{ scale: checkmarkScale }]
                }
              ]}
            >
              <Ionicons name="checkmark" size={40} color="#19A68D" />
            </Animated.View>
            
            {/* Success Message */}
            <Text style={styles.successTitle}>Succès</Text>
            <Text style={styles.successMessage}>
              Vous avez réinitialisé votre mot de passe avec succès.
            </Text>
            
            {/* Login Button */}
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 40,
    lineHeight: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 60,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  strengthContainer: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 5,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthValid: {
    backgroundColor: '#19A68D',
  },
  strengthInvalid: {
    backgroundColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  createButton: {
    backgroundColor: '#19A68D',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#19A68D',
    opacity: 0.7,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Success Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBF7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#19A68D',
    borderRadius: 30,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});