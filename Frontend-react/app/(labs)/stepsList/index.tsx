"use client"

import { StyleSheet } from "react-native";
import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { getTechniqueSteps, getStepTips, type StepTip } from "@/api/getTechniqueDetail"
console.log("StyleSheet:", StyleSheet);

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
  const [loadingTips, setLoadingTips] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  const fetchStepTips = async (stepId: number, stepIndex: number) => {
    try {
      setLoadingTips(true)
      const tips = await getStepTips(stepId)
      
      setSteps(prevSteps => {
        const newSteps = [...prevSteps]
        newSteps[stepIndex] = {
          ...newSteps[stepIndex],
          tips: tips
        }
        return newSteps
      })
    } catch (error) {
      console.error("Error fetching step tips:", error)
    } finally {
      setLoadingTips(false)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1)
        
        const currentStep = steps[currentStepIndex]
        if (currentStep && currentStep.tips && currentStep.tips.length > 1) {
          const stepDurationInSeconds = currentStep.duration * 60
          const timeElapsed = stepDurationInSeconds - timer
          const tipDuration = Math.floor(stepDurationInSeconds / currentStep.tips.length)
          const newTipIndex = Math.floor(timeElapsed / tipDuration)
          
          // Ensure we don't exceed the number of tips
          const clampedTipIndex = Math.min(newTipIndex, currentStep.tips.length - 1)
          
          if (clampedTipIndex !== currentTipIndex) {
            setCurrentTipIndex(clampedTipIndex)
          }
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timer, currentStepIndex, steps])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStepPress = async (index: number) => {
    setCurrentStepIndex(index)
    setCurrentTipIndex(0)
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
    
    await fetchStepTips(newSteps[index].id, index)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#059669" // Emerald-600
      case "in-progress":
        return "#0284C7" // Sky-600
      case "todo":
        return "#64748B" // Slate-500
      default:
        return "#64748B"
    }
  }

  const getStepStatusBgColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#D1FAE5" // Emerald-100
      case "in-progress":
        return "#E0F2FE" // Sky-100
      case "todo":
        return "#F1F5F9" // Slate-100
      default:
        return "#F1F5F9"
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
            setCurrentTipIndex(0)
            await fetchStepTips(transformedSteps[0].id, 0)
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
          <Ionicons name="chevron-back" size={24} color="#475569" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Instructions Détaillées</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Technique Title */}
        <View style={styles.titleSection}>
          <Text style={styles.techniqueTitle}>{techniqueName || "Technique de Laboratoire"}</Text>
          <Text style={styles.techniqueSubtitle}>Colorations Histologiques de Base</Text>
        </View>

        {/* Steps Progress Overview */}
        <View style={styles.progressOverview}>
          <View style={styles.progressHeader}>
            <Ionicons name="list" size={22} color="#0284C7" />
            <Text style={styles.stepsTitle}>Liste des Étapes</Text>
            <View style={styles.progressBadge}>
              <Text style={styles.progressText}>
                {currentStepIndex + 1}/{steps.length}
              </Text>
            </View>
          </View>
        </View>

        {/* Steps List */}
        {steps.map((step, index) => (
          <TouchableOpacity
            key={step.id}
            style={[
              styles.stepCard,
              {
                borderColor: getStepStatusColor(step.status),
                backgroundColor: step.status === "in-progress" ? "#FEFEFF" : "#FFFFFF",
                transform: [{ scale: step.status === "in-progress" ? 1.02 : 1 }],
              },
            ]}
            onPress={() => handleStepPress(index)}
            activeOpacity={0.7}
          >
            {/* Step Header */}
            <View style={styles.stepHeader}>
              <View style={styles.stepTitleRow}>
                <View style={[styles.stepBadge, { backgroundColor: getStepStatusBgColor(step.status) }]}>
                  <Text style={[styles.stepNumber, { color: getStepStatusColor(step.status) }]}>{step.id}</Text>
                </View>
                <Text style={styles.stepName}>{step.title}</Text>
              </View>

              {/* Status and Timer */}
              <View style={styles.statusRow}>
                {step.status === "in-progress" && (
                  <View style={styles.timerContainer}>
                    <Ionicons name="time" size={16} color="#0284C7" />
                    <Text style={styles.timerText}>{formatTime(timer)}</Text>
                  </View>
                )}

                <View style={[styles.statusBadge, { backgroundColor: getStepStatusBgColor(step.status) }]}>
                  <Text style={[styles.statusText, { color: getStepStatusColor(step.status) }]}>
                    {getStepStatusText(step.status)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Step Details */}
            <View style={styles.stepDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="flask" size={16} color="#64748B" />
                  <Text style={styles.detailLabel}>Réactif</Text>
                  <Text style={styles.detailValue}>{step.reactive}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="timer" size={16} color="#64748B" />
                  <Text style={styles.detailLabel}>Durée</Text>
                  <Text style={styles.detailValue}>{step.duration} min</Text>
                </View>
              </View>

              {step.tips && step.tips.length > 0 && step.status === "in-progress" && (
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Ionicons name="bulb" size={16} color="#0284C7" />
                    <Text style={styles.detailLabel}>Conseil</Text>
                    <View style={styles.rotatingTipContainer}>
                      <Text style={styles.rotatingTipText}>
                        {step.tips[currentTipIndex]?.tip || step.description}
                      </Text>
                      {step.tips.length > 1 && (
                        <View style={styles.tipIndicator}>
                          <Text style={styles.tipIndicatorText}>
                            {currentTipIndex + 1}/{step.tips.length}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              )}

              {step.description && step.status !== "in-progress" && (
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Ionicons name="information-circle" size={16} color="#64748B" />
                    <Text style={styles.detailLabel}>Conseil</Text>
                    <Text style={styles.detailValue}>{step.description}</Text>
                  </View>
                </View>
              )}

              {step.tips && step.tips.length > 0 && step.status !== "in-progress" && (
                <View style={styles.tipsContainer}>
                  <View style={styles.tipsHeader}>
                    <Ionicons name="bulb" size={16} color="#0284C7" />
                    <Text style={styles.tipsTitle}>Conseils pratiques</Text>
                  </View>
                  {step.tips.map((tip) => (
                    <View key={tip.id} style={styles.tipItem}>
                      <Text style={styles.tipText}>• {tip.tip}</Text>
                      {tip.description && <Text style={styles.tipDescription}>{tip.description}</Text>}
                      {tip.pivot?.duration && (
                        <Text style={styles.tipDuration}>Durée recommandée: {tip.pivot.duration}s</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Timer Controls for Current Step */}
            {step.status === "in-progress" && (
              <View style={styles.timerControls}>
                <TouchableOpacity
                  style={[styles.controlButton, isRunning ? styles.pauseButton : styles.playButton]}
                  onPress={toggleTimer}
                  activeOpacity={0.8}
                >
                  <Ionicons name={isRunning ? "pause" : "play"} size={18} color="#FFFFFF" />
                  <Text style={styles.controlButtonText}>{isRunning ? "Pause" : "Reprendre"}</Text>
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
                      width: `${Math.max(0, ((step.duration * 60 - timer) / (step.duration * 60)) * 100)}%`,
                      backgroundColor: getStepStatusColor(step.status),
                    },
                  ]}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
          <Ionicons name="home" size={24} color="#0284C7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
          <Ionicons name="mail-outline" size={24} color="#64748B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Slate-50
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0", // Slate-200
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B", // Slate-800
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    marginBottom: 20,
  },
  techniqueTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A", // Slate-900
    marginBottom: 8,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  techniqueSubtitle: {
    fontSize: 16,
    color: "#64748B", // Slate-500
    fontWeight: "500",
  },
  progressOverview: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    flex: 1,
    marginLeft: 12,
  },
  progressBadge: {
    backgroundColor: "#E0F2FE", // Sky-100
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0284C7", // Sky-600
  },
  stepCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  stepHeader: {
    marginBottom: 16,
  },
  stepTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "700",
  },
  stepName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
    lineHeight: 24,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7", // Amber-100
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#92400E", // Amber-800
    fontFamily: "monospace",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  stepDetails: {
    gap: 12,
  },
  detailRow: {
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569", // Slate-600
    minWidth: 60,
  },
  detailValue: {
    fontSize: 14,
    color: "#64748B",
    flex: 1,
    lineHeight: 20,
  },
  tipsContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#F0F9FF", // Sky-50
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#0284C7",
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0284C7",
  },
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#0369A1", // Sky-700
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 13,
    color: "#0284C7",
    fontStyle: "italic",
    lineHeight: 18,
    paddingLeft: 12,
  },
  tipDuration: {
    fontSize: 12,
    color: "#059669", // Emerald-600
    fontWeight: "500",
    paddingLeft: 12,
    marginTop: 2,
  },
  timerControls: {
    alignItems: "center",
    marginTop: 16,
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    minWidth: 140,
    justifyContent: "center",
  },
  pauseButton: {
    backgroundColor: "#EF4444", // Red-500
  },
  playButton: {
    backgroundColor: "#059669", // Emerald-600
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#E2E8F0", // Slate-200
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 16,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  navButton: {
    padding: 12,
    borderRadius: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 18,
    color: "#64748B",
    fontWeight: "500",
  },
  loadingTipsText: {
    fontSize: 12,
    color: "#64748B",
    fontStyle: "italic",
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
  rotatingTipContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rotatingTipText: {
    fontSize: 14,
    color: "#0284C7",
    fontWeight: "500",
    flex: 1,
    lineHeight: 20,
  },
  tipIndicator: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  tipIndicatorText: {
    fontSize: 12,
    color: "#0284C7",
    fontWeight: "600",
  },
})
