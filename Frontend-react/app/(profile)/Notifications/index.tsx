"use client"
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Stack, useRouter } from "expo-router"

// Sample notification data
const notifications = [
  {
    id: 1,
    title: "Résultats disponibles",
    message: "Vos résultats d'analyse sont maintenant disponibles.",
    time: "Il y a 5 min",
    read: false,
    icon: "document-text-outline",
  },
  {
    id: 2,
    title: "Rendez-vous confirmé",
    message: "Votre rendez-vous au Centre d'Analyse a été confirmé pour demain à 14h00.",
    time: "Il y a 2 heures",
    read: false,
    icon: "calendar-outline",
  },
  {
    id: 3,
    title: "Nouveau laboratoire",
    message: "Un nouveau laboratoire a été ajouté à notre réseau: Centre de Biologie Moléculaire.",
    time: "Il y a 1 jour",
    read: true,
    icon: "flask-outline",
  },
  {
    id: 4,
    title: "Mise à jour de l'application",
    message: "Une nouvelle version de l'application est disponible avec des fonctionnalités améliorées.",
    time: "Il y a 3 jours",
    read: true,
    icon: "refresh-outline",
  },
  {
    id: 5,
    title: "Promotion spéciale",
    message: "Profitez d'une réduction de 15% sur les analyses complètes jusqu'à la fin du mois.",
    time: "Il y a 1 semaine",
    read: true,
    icon: "pricetag-outline",
  },
]

export default function NotificationsPage() {
  const router = useRouter()

  return (
    <>
      <Stack.Screen
        options={{
          title: "Notifications",
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerShadowVisible: true,
          headerLeft: () => (
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Centre de notifications</Text>
          <TouchableOpacity>
            <Text style={styles.markAllRead}>Tout marquer comme lu</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.notificationList}>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[styles.notificationItem, !notification.read && styles.unreadNotification]}
            >
              <View style={styles.notificationIcon}>
                <Ionicons name={notification.icon} size={24} color="#4a9ea1" />
              </View>
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={60} color="#ccc" />
            <Text style={styles.emptyStateText}>Aucune notification</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    marginLeft: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  markAllRead: {
    fontSize: 14,
    color: "#4a9ea1",
    fontWeight: "500",
  },
  notificationList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: "#e8f4f4",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4a9ea1",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
  },
})
