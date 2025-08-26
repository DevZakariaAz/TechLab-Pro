"use client"

import { useState } from "react"
import { Alert } from "react-native"

import { Stack, useRouter } from "expo-router"
import { sendResetCode } from "@/api/auth"

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
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function ForgotPasswordScreen({ navigation }) {

  const router = useRouter()   
  const [activeTab, setActiveTab] = useState("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleReset = async () => {
    if (activeTab === "email" && validateEmail(email)) {
      setIsLoading(true)
      try {
        const response = await sendResetCode(email)
        if (response.status) {
          Alert.alert("Code envoyé", "Veuillez vérifier votre boîte de réception.")
          router.push({ pathname: "/otpPage", params: { email } })   // ✅ navigate correctly
        }
        else {
          Alert.alert("Erreur", response.message || "Une erreur est survenue")
        }
      } catch (error) {
        Alert.alert("Erreur", "Impossible de se connecter au serveur")
      } finally {
        setIsLoading(false)
      }
    } else if (activeTab === "phone" && phone.length > 0) {
      Alert.alert("Info", "La réinitialisation par téléphone n'est pas encore disponible")
    } else {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Creation de mot de passe",
          headerTitleAlign: "center",
          headerBackVisible: true,
        }}
      />

      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoid}>
        <View style={styles.header}></View>
        <View style={styles.content}>
          <Text style={styles.title}>Mot de passe oublié?</Text>
          <Text style={styles.subtitle}>
            Entrez votre email ou votre numéro de téléphone, nous vous enverrons un code de confirmation
          </Text>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "email" && styles.activeTab]}
              onPress={() => handleTabChange("email")}
            >
              <Text style={[styles.tabText, activeTab === "email" && styles.activeTabText]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "phone" && styles.activeTab]}
              onPress={() => handleTabChange("phone")}
            >
              <Text style={[styles.tabText, activeTab === "phone" && styles.activeTabText]}>Téléphone</Text>
            </TouchableOpacity>
          </View>

          {activeTab === "email" ? (
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={20} color="#19A68D" />
              </View>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => {
                  setEmail(text)
                  setIsValid(validateEmail(text))
                }}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {isValid && email.length > 0 && <Ionicons name="checkmark" size={24} color="#19A68D" />}
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="call-outline" size={20} color="#19A68D" />
              </View>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Numéro de téléphone"
                keyboardType="phone-pad"
              />
            </View>
          )}

          <TouchableOpacity
            style={[styles.resetButton, isLoading && styles.disabledButton]}
            onPress={handleReset}
            disabled={isLoading}
          >
            <Text style={styles.resetButtonText}>
              {isLoading ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 5,
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
  tabContainer: {
    flexDirection: "row",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
    height: 50,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: "transparent",
  },
  tabText: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  activeTabText: {
    color: "#19A68D",
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 30,
    height: 60,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
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
