"use client"

import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useState, useEffect } from "react"
import { getTechniqueDetail, getTechniqueSteps, type TechniqueDetail, type Step } from "@/api/getTechniqueDetail"
import { getCategories, type Category } from "@/api/getCategories"
import { router } from "expo-router"

// const StarRating = ({
//   rating,
//   size = 20,
//   color = "#199A8E",
// }: {
//   rating: number
//   size?: number
//   color?: string
// }) => {
//   return (
//     <View style={styles.ratingContainer}>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Ionicons
//           key={star}
//           name={star <= rating ? "star" : "star-outline"}
//           size={size}
//           color={color}
//           style={styles.star}
//         />
//       ))}
//       <Text style={[styles.ratingText, { color }]}>{rating.toFixed(1)}</Text>
//     </View>
//   )
// }

const TechDetailStep = ({
  stepTitle,
  stepDuration,
  stepNumber,
  onPress,
}: {
  stepTitle: string
  stepDuration: string
  stepNumber: string
  onPress?: () => void
}) => {
  return (
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
}

const LoadingState = () => (
  <>
    <Stack.Screen
      options={{
        title: "Détails de Technique",
        headerTitleAlign: "center",
        headerBackVisible: true,
        headerBackTitle: "",
        // headerBackTitleVisible: false,
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: "#000",
        },
      }}
    />
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
    <Stack.Screen
      options={{
        title: "Détails de Technique",
        headerTitleAlign: "center",
        headerBackVisible: true,
        headerBackTitle: "",
        // headerBackTitleVisible: false,
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: "#000",
        },
      }}
    />
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

const TechniqueHeader = ({
  technique,
  categoryName,
}: {
  technique: TechniqueDetail | null
  categoryName: string
}) => (
  <View style={styles.techniqueInfo}>
    <Text style={styles.title}>{technique?.title || "Chargement du titre..."}</Text>
    <Text style={styles.category}>{categoryName}</Text>
    {/* <StarRating rating={technique?.rating || 0} /> */}
  </View>
)

const BottomActions = ({
  onShare,
  onExport,
  onStart,
}: {
  onShare: () => void
  onExport: () => void
  onStart: () => void
}) => (
  <View style={styles.bottomNavigation}>
    <TouchableOpacity style={styles.actionButton} onPress={onShare}>
      <Ionicons name="share-outline" size={24} color="#666" />
      <Text style={styles.actionButtonText}>Partager</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionButton} onPress={onExport}>
      <Ionicons name="download-outline" size={24} color="#666" />
      <Text style={styles.actionButtonText}>Exporter</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.startButton} onPress={onStart}>
      <Text style={styles.startButtonText}>Démarrer</Text>
    </TouchableOpacity>
  </View>
)

const TechniquesDetail = ({ techniqueId = "1" }: { techniqueId?: string }) => {
  const [technique, setTechnique] = useState<TechniqueDetail | null>(null)
  const [steps, setSteps] = useState<Step[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTechniqueData = async () => {
    try {
      setLoading(true)
      setError(null)

      const numericId = Number.parseInt(techniqueId, 10)

      const [techniqueData, stepsData, categoriesData] = await Promise.all([
        getTechniqueDetail(numericId),
        getTechniqueSteps(numericId),
        getCategories(),
      ])

      console.log("Technique data received:", techniqueData)
      console.log("Categories response received:", categoriesData)

      setTechnique(techniqueData)
      setSteps(stepsData.sort((a, b) => a.order - b.order))
      setCategories(categoriesData.categories || [])
    } catch (err) {
      console.error("Error fetching technique data:", err)
      setError("Erreur lors du chargement des données")

      const fallbackTechnique = {
        id: Number.parseInt(techniqueId, 10),
        name: "Hématoxyline-Éosine (H&E)",
        title: "Hématoxyline-Éosine (H&E)",
        description:
          "La coloration de Gram permet de différencier les bactéries en fonction de la composition de leur paroi cellulaire",
        category_id: 1,
        category: { id: 1, name: "Colorations Histologiques de Base" },
        rating: 4.0,
        created_at: "",
        updated_at: "",
      }

      const fallbackCategories = [{ id: 1, name: "Colorations Histologiques de Base", created_at: "", updated_at: "" }]

      console.log("Using fallback data:", fallbackTechnique)
      setTechnique(fallbackTechnique)
      setCategories(fallbackCategories)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTechniqueData()
  }, [techniqueId])

  const getCategoryName = (): string => {
    if (technique?.category?.name) {
      return technique.category.name
    }

    if (technique?.category_id && categories.length > 0) {
      const category = categories.find((cat) => cat.id.toString() === technique.category_id.toString())
      if (category?.name) {
        return category.name
      }
    }

    console.log("No category found, using default")
    return "Catégorie non spécifiée"
  }

  const handleShare = () => {
    console.log("Share technique:", technique?.name)
    // TODO: Implement share functionality
  }

  const handleExport = () => {
    console.log("Export technique:", technique?.name)
    // TODO: Implement export functionality (PDF, etc.)
  }

  const handleEdit = () => {
    console.log("Edit technique:", technique?.id)
    // TODO: Navigate to edit screen
  }

  const handleStart = () => {
    console.log("Start technique:", technique?.id)
    router.push({
      pathname: "/stepsList",
      params: {
        techniqueId: technique?.id?.toString() || techniqueId,
        techniqueName: technique?.title,
      },
    })
  }

  const handleStepPress = (stepId: number) => {
    console.log("Step pressed:", stepId)
    // TODO: Navigate to step detail or execution
  }

  const handleRetry = () => {
    setError(null)
    fetchTechniqueData()
  }

  if (loading) {
    return <LoadingState />
  }

  if (error && !technique) {
    return <ErrorState error={error} onRetry={handleRetry} />
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Détails de Technique",
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerBackTitle: "",
          // headerBackTitleVisible: false,
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
            color: "#000",
          },
        }}
      />
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
            {steps.length > 0 ? (
              steps.map((step, index) => (
                <TechDetailStep
                  key={step.id}
                  stepTitle={step.title}
                  stepDuration={step.duration}
                  stepNumber={(index + 1).toString()}
                  onPress={() => handleStepPress(step.id)}
                />
              ))
            ) : (
              <Text style={styles.noStepsText}>Aucune étape disponible</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Updated BottomActions to include export instead of edit */}
      <BottomActions onShare={handleShare} onExport={handleExport} onStart={handleStart} />
    </>
  )
}

export default TechniquesDetail

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
