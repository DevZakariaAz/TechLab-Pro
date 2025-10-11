"use client"

import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getTechniqueDetail, type TechniqueDetail, type Step } from "@/api/getTechniqueDetail"
import { getCategories, type Category } from "@/api/getCategories"
import { router } from "expo-router"
import { AuthGuard } from "@/components/AuthGuard"
import RestartTechniqueModal from "@/components/RestartTechniqueModal"

const TECHNIQUE_PROGRESS_KEY = "technique_progress";

// Step component
const TechDetailStep = ({ stepTitle, stepDuration, stepNumber, onPress }: { stepTitle: string; stepDuration: number; stepNumber: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.stepContainer} onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{stepTitle}</Text>
      <Text style={styles.stepDuration}>Durée estimée • {stepDuration} min</Text>
    </View>
    <View style={styles.stepNumberContainer}>
      <Text style={styles.stepNumber}>Étape {stepNumber}</Text>
    </View>
  </TouchableOpacity>
)

// Loading and error components
const LoadingState = () => (
  <>
    <Stack.Screen options={{ title: "Détails de Technique", headerTitleAlign: "center", headerBackVisible: true }} />
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#199A8E" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    </SafeAreaView>
  </>
)

const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <>
    <Stack.Screen options={{ title: "Détails de Technique", headerTitleAlign: "center", headerBackVisible: true }} />
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#ff6b6b" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </>
)

// Technique header
const TechniqueHeader = ({ technique, categoryName }: { technique: TechniqueDetail | null; categoryName: string }) => (
  <View style={styles.techniqueInfo}>
    <Text style={styles.title}>{technique?.title || "Chargement du titre..."}</Text>
    <Text style={styles.category}>{categoryName}</Text>
  </View>
)

// Bottom action buttons
const BottomActions = ({ onShare, onExport, onStart, progress }: { onShare: () => void; onExport: () => void; onStart: () => void; progress: 'not_started' | 'started' | 'finished' }) => (
  <View style={styles.bottomNavigation}>
    <TouchableOpacity style={styles.actionButton} onPress={onShare}>
      <Ionicons name="share-outline" size={24} color="#666" />
      <Text style={styles.actionButtonText}>Partager</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionButton} onPress={onExport}>
      <Ionicons name="download-outline" size={24} color="#666" />
      <Text style={styles.actionButtonText}>Exporter</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.startButton, progress === 'finished' && { backgroundColor: '#999' }]} onPress={onStart}>
      <Text style={styles.startButtonText}>
        {progress === 'not_started' ? 'Démarrer' : progress === 'started' ? 'Terminer' : 'Recommencer'}
      </Text>
    </TouchableOpacity>
  </View>
)

export default function TechniquesDetail({ techniqueId = "1" }: { techniqueId?: string }) {
  const [technique, setTechnique] = useState<TechniqueDetail | null>(null)
  const [steps, setSteps] = useState<Step[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<'not_started' | 'started' | 'finished'>('not_started')
  const [showRestartModal, setShowRestartModal] = useState(false)

  // AsyncStorage helpers
  const loadProgress = async (techId: number) => {
    try {
      const data = await AsyncStorage.getItem(TECHNIQUE_PROGRESS_KEY)
      if (data) {
        const obj = JSON.parse(data)
        if (obj[techId]) setProgress(obj[techId])
      }
    } catch (err) {
      console.log("Error loading progress:", err)
    }
  }

  const startTechnique = async (techId: number) => {
    try {
      const data = await AsyncStorage.getItem(TECHNIQUE_PROGRESS_KEY)
      const obj = data ? JSON.parse(data) : {}
      obj[techId] = 'started'
      await AsyncStorage.setItem(TECHNIQUE_PROGRESS_KEY, JSON.stringify(obj))
      setProgress('started')
    } catch (err) {
      console.log("Error starting technique:", err)
    }
  }

  const finishTechnique = async (techId: number) => {
    try {
      const data = await AsyncStorage.getItem(TECHNIQUE_PROGRESS_KEY)
      const obj = data ? JSON.parse(data) : {}
      obj[techId] = 'finished'
      await AsyncStorage.setItem(TECHNIQUE_PROGRESS_KEY, JSON.stringify(obj))
      setProgress('finished')
    } catch (err) {
      console.log("Error finishing technique:", err)
    }
  }

  // Fetch technique + categories
  const fetchTechniqueData = async () => {
    try {
      setLoading(true)
      setError(null)
      const numericId = Number.parseInt(techniqueId, 10)
      const [techniqueData, categoriesData] = await Promise.all([
        getTechniqueDetail(numericId),
        getCategories(),
      ])

      setTechnique(techniqueData)
      setSteps(
        (techniqueData.steps || []).sort((a, b) => (a.pivot?.position || 0) - (b.pivot?.position || 0))
      )
      setCategories(categoriesData.categories || [])
    } catch (err) {
      console.error("Error fetching technique data:", err)
      setError("Erreur lors du chargement des données")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTechniqueData() }, [techniqueId])
  useEffect(() => { if (technique?.id) loadProgress(technique.id) }, [technique])

  const getCategoryName = (): string => {
    if (technique?.category?.name) return technique.category.name
    if (technique?.category_id && categories.length > 0) {
      const category = categories.find((cat) => cat.id.toString() === technique.category_id.toString())
      if (category?.name) return category.name
    }
    return "Catégorie non spécifiée"
  }

  const handleShare = () => console.log("Share technique:", technique?.title)
  const handleExport = () => console.log("Export technique:", technique?.title)
  const handleStepPress = (stepId: number) => console.log("Step pressed:", stepId)
  const handleRetry = () => { setError(null); fetchTechniqueData() }

  const handleStart = async () => {
    if (!technique?.id) return

    if (progress === 'finished') {
      setShowRestartModal(true)
      return
    }

    if (progress === 'not_started') await startTechnique(technique.id)
    else if (progress === 'started') await finishTechnique(technique.id)

    router.push({
      pathname: "/stepsList",
      params: { techniqueId: technique.id.toString(), techniqueName: technique.title },
    })
  }

  const handleRestartConfirm = async () => {
    if (!technique?.id) return
    await startTechnique(technique.id)
    setShowRestartModal(false)
    router.push({
      pathname: "/stepsList",
      params: { techniqueId: technique.id.toString(), techniqueName: technique.title },
    })
  }

  const handleRestartCancel = () => setShowRestartModal(false)

  if (loading) return <AuthGuard><LoadingState /></AuthGuard>
  if (error && !technique) return <AuthGuard><ErrorState error={error} onRetry={handleRetry} /></AuthGuard>

  return (
    <AuthGuard>
      <>
        <Stack.Screen options={{ title: "Détails de Technique", headerTitleAlign: "center", headerBackVisible: true }} />
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={technique?.image ? { uri: technique.image } : require("@/assets/images/technique.png")}
              style={styles.heroImage}
            />
            <TechniqueHeader technique={technique} categoryName={getCategoryName()} />
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description de la Technique :</Text>
              <Text style={styles.descriptionText}>{technique?.description || "Aucune description disponible"}</Text>
            </View>
            <View style={styles.stepsSection}>
              <Text style={styles.sectionTitle}>Liste des Étapes :</Text>
              {steps.length > 0 ? steps.map((step, index) => (
                <TechDetailStep
                  key={step.id}
                  stepTitle={step.title}
                  stepDuration={step.duration}
                  stepNumber={(index + 1).toString()}
                  onPress={() => handleStepPress(step.id)}
                />
              )) : <Text style={styles.noStepsText}>Aucune étape disponible</Text>}
            </View>
          </ScrollView>
        </SafeAreaView>

        <BottomActions onShare={handleShare} onExport={handleExport} onStart={handleStart} progress={progress} />
        <RestartTechniqueModal
          visible={showRestartModal}
          techniqueTitle={technique?.title || ""}
          onConfirm={handleRestartConfirm}
          onCancel={handleRestartCancel}
        />
      </>
    </AuthGuard>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 90,
  },
  heroImage: {
    width: "100%",
    height: 240,
    borderRadius: 20,
    resizeMode: "cover",
    marginTop: 10,
  },
  techniqueInfo: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: "#999",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#199A8E",
    marginLeft: 8,
  },
  descriptionSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  stepsSection: {
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  stepDuration: {
    fontSize: 14,
    color: "#999",
  },
  stepNumberContainer: {
    backgroundColor: "#199A8E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  actionButton: {
    alignItems: "center",
    padding: 8,
    minWidth: 80,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#199A8E",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#199A8E",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  noStepsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 20,
  },
})
