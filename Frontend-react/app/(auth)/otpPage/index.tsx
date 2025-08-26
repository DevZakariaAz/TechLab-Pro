"use client"

import { useState, useRef } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert } from "react-native"
import { Stack, useRouter, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { resetPassword } from "@/api/auth"

export default function OtpVerificationScreen() {
  const router = useRouter()
  const { email } = useLocalSearchParams()
  const [code, setCode] = useState(["", "", "", ""])
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef([])

  const handleCodeChange = (text, index) => {
    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    // Auto-focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

const handleResetPassword = async () => {
  const codeString = code.join("").trim(); // Ensure no extra spaces

  if (codeString.length !== 4) {
    Alert.alert("Erreur", "Veuillez entrer le code à 4 chiffres");
    return;
  }

  if (password.length < 6) {
    Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
    return;
  }

  setIsLoading(true);

  try {
    // Make sure password_confirmation matches exactly
    const response = await resetPassword(email, codeString, password, password);

    if (response.status) 
        router.replace("/(tabs)") 
    else 
      Alert.alert("Erreur", response.message || "Code invalide ou expiré");
    
  } catch (error) {
    Alert.alert("Erreur", "Impossible de se connecter au serveur");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Vérification du code",
          headerTitleAlign: "center",
          headerBackVisible: true,
        }}
      />
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <Text style={styles.title}>Entrez le code de vérification</Text>
        <Text style={styles.subtitle}>Nous avons envoyé un code à 4 chiffres à {email}</Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <View style={styles.passwordContainer}>
          <Text style={styles.label}>Nouveau mot de passe</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#19A68D" />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Nouveau mot de passe"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmer le mot de passe</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#19A68D" />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirmer le mot de passe"
              secureTextEntry={!showPassword}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.resetButton, isLoading && styles.disabledButton]}
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          <Text style={styles.resetButtonText}>
            {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 30,
    lineHeight: 24,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  passwordContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 8,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 60,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    marginLeft: 10,
  },
  resetButton: {
    backgroundColor: "#19A68D",
    borderRadius: 30,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.6,
  },
})
