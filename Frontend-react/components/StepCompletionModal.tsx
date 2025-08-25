"use client"

import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"
import { Audio } from "expo-av"
import { useEffect, useRef } from "react"

interface StepCompletionModalProps {
  visible: boolean
  stepNumber: number
  stepTitle: string
  onContinue: () => void
}

export default function StepCompletionModal({ visible, stepNumber, stepTitle, onContinue }: StepCompletionModalProps) {
  const soundRef = useRef<Audio.Sound | null>(null)

  useEffect(() => {
    const playAlertSound = async () => {
      if (visible) {
        try {
          if (soundRef.current) {
            await soundRef.current.stopAsync()
            await soundRef.current.unloadAsync()
          }

          const { sound } = await Audio.Sound.createAsync(
            { uri: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            {
              shouldPlay: true,
              isLooping: true,
              volume: 0.8,
            },
          )
          soundRef.current = sound
        } catch (error) {
          console.log("Error playing alert sound:", error)
        }
      } else {
        if (soundRef.current) {
          try {
            await soundRef.current.stopAsync()
            await soundRef.current.unloadAsync()
            soundRef.current = null
          } catch (error) {
            console.log("Error stopping sound:", error)
          }
        }
      }
    }

    playAlertSound()

    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync().catch(() => {})
        soundRef.current.unloadAsync().catch(() => {})
      }
    }
  }, [visible])

  const handleContinue = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync()
        await soundRef.current.unloadAsync()
        soundRef.current = null
      } catch (error) {
        console.log("Error stopping sound on continue:", error)
      }
    }
    onContinue()
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade" statusBarTranslucent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.checkmarkContainer}>
            <Ionicons name="checkmark" size={40} color={Colors.lightGreen} />
          </View>

          <Text style={styles.title}>Étape terminée</Text>

          <Text style={styles.stepInfo}>
            <Text style={styles.stepNumber}>Étape {stepNumber} : </Text>
            <Text style={styles.stepTitle}>{stepTitle}</Text>
          </Text>

          <Text style={styles.congratsMessage}>Félicitations ! Vous avez terminé cette étape avec succès</Text>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue} activeOpacity={0.8}>
            <Text style={styles.continueButtonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    width: "100%",
    maxWidth: 340,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E6F7F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 16,
    textAlign: "center",
  },
  stepInfo: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  stepNumber: {
    color: Colors.lightGreen,
    fontWeight: "600",
  },
  stepTitle: {
    color: Colors.light.text,
    fontWeight: "500",
  },
  congratsMessage: {
    fontSize: 14,
    color: Colors.light.icon,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
  },
  continueButton: {
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  continueButtonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: "600",
  },
})
