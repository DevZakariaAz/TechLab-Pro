"use client"

import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"

interface RestartTechniqueModalProps {
  visible: boolean
  techniqueTitle: string
  onConfirm: () => void
  onCancel: () => void
}

export default function RestartTechniqueModal({ visible, techniqueTitle, onConfirm, onCancel }: RestartTechniqueModalProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" statusBarTranslucent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Ionicons name="warning-outline" size={50} color="#ff6b6b" style={{ marginBottom: 16 }} />
          <Text style={styles.title}>Redémarrer la technique ?</Text>
          <Text style={styles.message}>
            La technique "{techniqueTitle}" a déjà été terminée. Voulez-vous vraiment recommencer ?
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>Oui, recommencer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  modalContainer: { backgroundColor: Colors.light.background, borderRadius: 20, padding: 32, width: "100%", maxWidth: 340, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "700", color: Colors.light.text, marginBottom: 12, textAlign: "center" },
  message: { fontSize: 16, color: Colors.light.icon, textAlign: "center", marginBottom: 24 },
  buttonsContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  button: { flex: 1, paddingVertical: 14, borderRadius: 25, marginHorizontal: 4, alignItems: "center" },
  cancelButton: { backgroundColor: "#f0f0f0" },
  confirmButton: { backgroundColor: "#199A8E" },
  cancelButtonText: { color: "#666", fontSize: 16, fontWeight: "600" },
  confirmButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
})
