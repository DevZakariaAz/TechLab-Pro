"use client"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Stack, useRouter } from "expo-router"
import { AuthGuard } from "@/components/AuthGuard"
import { useState, useEffect } from "react"
import { apiService, type Laboratory } from "@/api/getLaboratories"
import { labImages } from "@/constants/labImages"


export default function AccueilPage() {
  const router = useRouter()
  const [laboratories, setLaboratories] = useState<Laboratory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchLaboratories()
  }, [])

  const fetchLaboratories = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getLaboratories()
      setLaboratories(data)
    } catch (err) {
      setError("Erreur lors du chargement des laboratoires")
      console.error("Error fetching laboratories:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      fetchLaboratories()
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await apiService.searchLaboratories(query)
      setLaboratories(data)
    } catch (err) {
      setError("Erreur lors de la recherche")
      console.error("Error searching laboratories:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <>
        <Stack.Screen
          options={{
            title: "Accueil",
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "600",
              color: "#1a1a1a",
            },
            headerRight: () => (
              <TouchableOpacity style={styles.notificationIcon}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#374151"
                  onPress={() => {
                    router.push("/notifications")
                  }}
                />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            ),
          }}
        />
        <SafeAreaView style={styles.container}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un laboratoire..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          <View style={styles.selectionContainer}>
            <View style={styles.selectionHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="flask-outline" size={24} color="#059669" />
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.selectionTitle}>Sélectionnez votre laboratoire</Text>
                <Text style={styles.selectionSubtitle}>Choisissez parmi nos centres spécialisés</Text>
              </View>
            </View>

            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#059669" />
                <Text style={styles.loadingText}>Chargement des laboratoires...</Text>
              </View>
            )}

            {error && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={24} color="#EF4444" />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchLaboratories}>
                  <Text style={styles.retryButtonText}>Réessayer</Text>
                </TouchableOpacity>
              </View>
            )}

            {!loading && !error && (
              <ScrollView style={styles.labOptions} showsVerticalScrollIndicator={false}>
                {laboratories.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="flask-outline" size={48} color="#9CA3AF" />
                    <Text style={styles.emptyText}>Aucun laboratoire trouvé</Text>
                  </View>
                ) : (
                  laboratories.map((lab) => (
                    <TouchableOpacity
                      key={lab.id}
                      style={styles.labCard}
                      onPress={() => {
                        router.push("/(labs)/techniquesList")
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.labContent}>
                        <View style={styles.labInfo}>
                          <Text style={styles.labName}>{lab.title}</Text>
                          {lab.description && <Text style={styles.labDescription}>{lab.description}</Text>}
                        </View>
                        <View style={styles.labImageContainer}>
                          {lab.image ? (
                            <Image source={labImages[lab.image] || require("@/assets/images/chemistry_lab.jpg")} style={styles.labImage} />
                          ) : (
                            <View style={[styles.labImage, styles.placeholderImage]}>
                              <Ionicons name="flask-outline" size={24} color="#9CA3AF" />
                            </View>
                          )}
                          <View style={styles.labBadge}>
                            <Ionicons name="chevron-forward" size={16} color="#ffffff" />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </>
    </AuthGuard>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  notificationIcon: {
    position: "relative",
    marginRight: 16,
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    right: 6,
    top: 6,
    backgroundColor: "#EF4444",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 32,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    fontWeight: "400",
  },
  selectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  selectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
    paddingTop: 4,
  },
  selectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  selectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "400",
  },
  labOptions: {
    flex: 1,
  },
  labCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  labContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  labInfo: {
    flex: 1,
    paddingRight: 16,
  },
  labName: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
    lineHeight: 22,
  },
  labDescription: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "400",
    marginTop: 6,
    lineHeight: 18,
  },
  labImageContainer: {
    position: "relative",
  },
  labImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  labBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#059669",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 16,
    fontWeight: "400",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    marginTop: 12,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "400",
  },
  retryButton: {
    backgroundColor: "#059669",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 16,
    fontWeight: "400",
  },
  placeholderImage: {
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
})
