"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { getTechniqueSteps, type StepTip } from "@/api/getTechniqueDetail"

interface Step {
  id: number
  title: string
  reactive: string
  duration: number
  description: string
  tips: StepTip[]
  status: "todo" | "in-progress" | "completed"
}

export default function StepsExecution() {
  const { techniqueId, techniqueName } = useLocalSearchParams<{
    techniqueId: string
    techniqueName: string
  }>()
  const router = useRouter()

  const [steps, setSteps] = useState<Step[]>([])
  const [loading, setLoading] = useState(true)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStepPress = (index: number) => {
    setCurrentStepIndex(index)
    const newSteps = [...steps]
    for (let i = 0; i < index; i++) {
      newSteps[i].status = "completed"
    }
    newSteps[index].status = "in-progress"
    for (let i = index + 1; i < newSteps.length; i++) {
      newSteps[i].status = "todo"
    }
    setSteps(newSteps)
    setTimer(newSteps[index].duration * 60)
    setIsRunning(true)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10B981"
      case "in-progress":
        return "#06B6D4"
      case "todo":
        return "#E5E7EB"
      default:
        return "#E5E7EB"
    }
  }

  const getStepStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminé"
      case "in-progress":
        return "En cours"
      case "todo":
        return "À faire"
      default:
        return "À faire"
    }
  }

  useEffect(() => {
    const fetchSteps = async () => {
      if (techniqueId) {
        try {
          setLoading(true)
          const apiSteps = await getTechniqueSteps(Number.parseInt(techniqueId))
          const transformedSteps: Step[] = apiSteps.map((apiStep, index) => ({
            id: apiStep.id,
            title: apiStep.title,
            reactive: apiStep.reactive,
            duration: Number.parseInt(apiStep.duration) || 5,
            description: apiStep.description,
            tips: apiStep.tips || [],
            status: index === 0 ? "in-progress" : "todo",
          }))
          setSteps(transformedSteps)
          if (transformedSteps.length > 0) {
            setTimer(transformedSteps[0].duration * 60)
            setIsRunning(true)
          }
        } catch (error) {
          console.error("Error fetching steps:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchSteps()
  }, [techniqueId])

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement des étapes...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Instructions Détaillées</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Technique Title */}
        <Text style={styles.techniqueTitle}>{techniqueName || "Technique de Laboratoire"}</Text>
        <Text style={styles.techniqueSubtitle}>Colorations Histologiques de Base</Text>

        {/* Steps List Title */}
        <View style={styles.stepsHeader}>
          <Ionicons name="list" size={20} color="#666" />
          <Text style={styles.stepsTitle}>Liste des Étapes :</Text>
        </View>

        {/* Steps List */}
        {steps.map((step, index) => (
          <TouchableOpacity
            key={step.id}
            style={[styles.stepCard, { borderColor: getStepStatusColor(step.status) }]}
            onPress={() => handleStepPress(index)}
          >
            <View style={styles.stepHeader}>
              <Text style={[styles.stepNumber, { color: getStepStatusColor(step.status) }]}>Étape {step.id}</Text>
              <Text style={styles.stepName}>: {step.title}</Text>

              {step.status === "in-progress" && (
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>{formatTime(timer)}</Text>
                </View>
              )}

              {step.status !== "in-progress" && (
                <Text style={[styles.statusText, { color: getStepStatusColor(step.status) }]}>
                  {getStepStatusText(step.status)}
                </Text>
              )}
            </View>

            <View style={styles.stepDetails}>
              <View style={styles.stepDetail}>
                <Text style={styles.detailLabel}>→ Réactif</Text>
                <Text style={styles.detailValue}>: {step.reactive}</Text>
              </View>
              <View style={styles.stepDetail}>
                <Text style={styles.detailLabel}>→ Temps</Text>
                <Text style={styles.detailValue}>: Durée estimée {step.duration} min</Text>
              </View>
              {step.description && (
                <View style={styles.stepDetail}>
                  <Text style={styles.detailLabel}>→ Conseil</Text>
                  <Text style={styles.detailValue}>: {step.description}</Text>
                </View>
              )}

              {step.tips && step.tips.length > 0 && (
                <View style={styles.tipsContainer}>
                  <Text style={styles.tipsTitle}>💡 Conseils :</Text>
                  {step.tips.map((tip) => (
                    <View key={tip.id} style={styles.tipItem}>
                      <Text style={styles.tipText}>• {tip.tip}</Text>
                      {tip.description && <Text style={styles.tipDescription}> {tip.description}</Text>}
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Timer Controls for Current Step */}
            {step.status === "in-progress" && (
              <View style={styles.timerControls}>
                <TouchableOpacity style={[styles.controlButton, styles.pauseButton]} onPress={toggleTimer}>
                  <Text style={styles.controlButtonText}>{isRunning ? "Pause" : "Reprendre"}</Text>
                  <Ionicons name={isRunning ? "pause" : "play"} size={16} color="#EF4444" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, styles.resumeButton]}>
                  <Text style={[styles.controlButtonText, { color: "#10B981" }]}>Reprise</Text>
                  <Ionicons name="refresh" size={16} color="#10B981" />
                </TouchableOpacity>
              </View>
            )}

            {/* Progress Bar for Current Step */}
            {step.status === "in-progress" && (
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${((step.duration * 60 - timer) / (step.duration * 60)) * 100}%`,
                      backgroundColor: getStepStatusColor(step.status),
                    },
                  ]}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={24} color="#06B6D4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="mail-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  techniqueTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 20,
    marginBottom: 8,
  },
  techniqueSubtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 24,
  },
  stepsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 8,
  },
  stepCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "600",
  },
  stepName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  timerContainer: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  timerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400E",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  stepDetails: {
    marginBottom: 12,
  },
  stepDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: "#06B6D4",
    fontWeight: "500",
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  timerControls: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginBottom: 12,
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  pauseButton: {
    backgroundColor: "#FEE2E2",
  },
  resumeButton: {
    backgroundColor: "#D1FAE5",
  },
  controlButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#EF4444",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  navButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
  },
  tipsContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#F0F9FF",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#0EA5E9",
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0369A1",
    marginBottom: 8,
  },
  tipItem: {
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: "#0369A1",
    fontWeight: "500",
  },
  tipDescription: {
    fontSize: 12,
    color: "#0284C7",
    fontStyle: "italic",
  },
})
