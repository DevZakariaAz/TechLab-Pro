"use client"
import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { getTechniqueSteps, getStepTips, type Step as ApiStep, type StepTip } from "@/api/getTechniqueDetail"
import { Colors } from "@/constants/Colors"
import StepCompletionModal from "@/app/(labs)/step-completion-modal"
import { StyleSheet } from "react-native"
import { Stack } from "expo-router"
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
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [completedStep, setCompletedStep] = useState<{ number: number; title: string } | null>(null)

  const playCompletionSound = () => {
    if (typeof window !== "undefined" && window.AudioContext) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2)

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    }
  }

  const completeCurrentStep = () => {
    const currentStep = steps[currentStepIndex]
    if (currentStep && currentStep.status === "in-progress") {
      const newSteps = [...steps]
      newSteps[currentStepIndex].status = "completed"
      setSteps(newSteps)

      setCompletedStep({
        number: currentStep.id,
        title: currentStep.title,
      })

      playCompletionSound()

      setShowCompletionModal(true)

      setIsRunning(false)
    }
  }

  const handleModalContinue = () => {
    setShowCompletionModal(false)
    setCompletedStep(null)

    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1
      handleStepPress(nextIndex)
    }
  }

  const fetchStepTips = async (stepId: number, stepIndex: number) => {
    try {
      setLoadingTips(true)
      const tips = await getStepTips(stepId)

      setSteps((prevSteps) => {
        const newSteps = [...prevSteps]
        newSteps[stepIndex] = {
          ...newSteps[stepIndex],
          tips: tips,
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
        setTimer((timer) => {
          if (timer <= 1) {
            completeCurrentStep()
            return 0
          }
          return timer - 1
        })

        const currentStep = steps[currentStepIndex]
        if (currentStep && currentStep.tips && currentStep.tips.length > 1) {
          const stepDurationInSeconds = currentStep.duration * 60
          const timeElapsed = stepDurationInSeconds - timer
          const tipDuration = Math.floor(stepDurationInSeconds / currentStep.tips.length)
          const newTipIndex = Math.floor(timeElapsed / tipDuration)

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

  const isStepAccessible = (stepIndex: number) => {
    // Can always access completed steps
    if (steps[stepIndex]?.status === "completed") return true

    // Can access current in-progress step
    if (steps[stepIndex]?.status === "in-progress") return true

    // Can only access the next step if current step is completed
    if (stepIndex === currentStepIndex + 1) {
      return steps[currentStepIndex]?.status === "completed"
    }

    // Cannot access future steps
    return false
  }

  const handleStepPress = async (index: number) => {
    // Prevent access to non-accessible steps
    if (!isStepAccessible(index)) {
      return
    }

    // Only allow moving to next step if current is completed, or accessing completed/current steps
    if (index > currentStepIndex && steps[currentStepIndex]?.status !== "completed") {
      return
    }

    setCurrentStepIndex(index)
    setCurrentTipIndex(0)
    const newSteps = [...steps]

    // Don't automatically mark previous steps as completed when going backwards
    if (index <= currentStepIndex) {
      // Just switch to the selected step without changing other statuses
      for (let i = 0; i < newSteps.length; i++) {
        if (i === index) {
          newSteps[i].status = "in-progress"
        } else if (newSteps[i].status === "in-progress") {
          newSteps[i].status = "todo"
        }
      }
    } else {
      // Moving forward - only allowed if current step is completed
      newSteps[index].status = "in-progress"
      for (let i = index + 1; i < newSteps.length; i++) {
        newSteps[i].status = "todo"
      }
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
        return Colors.lightGreen
      case "in-progress":
        return Colors.light.primary
      case "todo":
        return Colors.light.icon
      default:
        return Colors.light.icon
    }
  }

  const getStepStatusBgColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#D1FAE5"
      case "in-progress":
        return Colors.light.secondary
      case "todo":
        return Colors.light.secondary
      default:
        return Colors.light.secondary
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
          const transformedSteps: Step[] = apiSteps.map((apiStep: ApiStep, index: number) => ({
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
          setSteps([])
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
      <Stack.Screen
        options={{
            title: "Instructions de la Technique",
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


      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.techniqueTitle}>{techniqueName || "Technique de Laboratoire"}</Text>
          <Text style={styles.techniqueSubtitle}>Colorations Histologiques de Base</Text>
        </View>

        <View style={styles.progressOverview}>
          <View style={styles.progressHeader}>
            <Ionicons name="list" size={22} color={Colors.light.primary} />
            <Text style={styles.stepsTitle}>Liste des Étapes</Text>
            <View style={styles.progressBadge}>
              <Text style={styles.progressText}>
                {currentStepIndex + 1}/{steps.length}
              </Text>
            </View>
          </View>
        </View>

        {steps.map((step, index) => (
          <TouchableOpacity
            key={step.id}
            style={[
              styles.stepCard,
              {
                borderColor: getStepStatusColor(step.status),
                backgroundColor: step.status === "in-progress" ? "#FEFEFF" : "#FFFFFF",
                transform: [{ scale: step.status === "in-progress" ? 1.02 : 1 }],
                opacity: isStepAccessible(index) ? 1 : 0.5,
              },
            ]}
            onPress={() => handleStepPress(index)}
            activeOpacity={isStepAccessible(index) ? 0.7 : 1}
            disabled={!isStepAccessible(index)}
          >
            <View style={styles.stepHeader}>
              <View style={styles.stepTitleRow}>
                <View style={[styles.stepBadge, { backgroundColor: getStepStatusBgColor(step.status) }]}>
                  <Text style={[styles.stepNumber, { color: getStepStatusColor(step.status) }]}>{step.id}</Text>
                  {!isStepAccessible(index) && (
                    <View style={styles.lockOverlay}>
                      <Ionicons name="lock-closed" size={12} color={Colors.light.icon} />
                    </View>
                  )}
                </View>
                <Text style={styles.stepName}>{step.title}</Text>
                {!isStepAccessible(index) && (
                  <Ionicons name="lock-closed" size={16} color={Colors.light.icon} style={styles.lockIcon} />
                )}
              </View>

              <View style={styles.statusRow}>
                {step.status === "in-progress" && (
                  <View style={styles.timerContainer}>
                    <Ionicons name="time" size={16} color={Colors.light.primary} />
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

            <View style={styles.stepDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="flask" size={16} color={Colors.light.icon} />
                  <Text style={styles.detailLabel}>Réactif</Text>
                  <Text style={styles.detailValue}>{step.reactive}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="timer" size={16} color={Colors.light.icon} />
                  <Text style={styles.detailLabel}>Durée</Text>
                  <Text style={styles.detailValue}>{step.duration} min</Text>
                </View>
              </View>

              {step.tips && step.tips.length > 0 && step.status === "in-progress" && (
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Ionicons name="bulb" size={16} color={Colors.light.primary} />
                    <Text style={styles.detailLabel}>Conseil</Text>
                    <View style={styles.rotatingTipContainer}>
                      <Text style={styles.rotatingTipText}>{step.tips[currentTipIndex]?.tip || step.description}</Text>
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
                    <Ionicons name="information-circle" size={16} color={Colors.light.icon} />
                    <Text style={styles.detailLabel}>Conseil</Text>
                    <Text style={styles.detailValue}>{step.description}</Text>
                  </View>
                </View>
              )}
            </View>

            {step.status === "in-progress" && (
              <View style={styles.timerControls}>
                <TouchableOpacity
                  style={[styles.controlButton, isRunning ? styles.pauseButton : styles.playButton]}
                  onPress={toggleTimer}
                  activeOpacity={0.8}
                >
                  <Ionicons name={isRunning ? "pause" : "play"} size={18} color={Colors.light.background} />
                  <Text style={styles.controlButtonText}>{isRunning ? "Pause" : "Reprendre"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, styles.completeButton]}
                  onPress={completeCurrentStep}
                  activeOpacity={0.8}
                >
                  <Ionicons name="checkmark" size={18} color={Colors.light.background} />
                  <Text style={styles.controlButtonText}>Terminer</Text>
                </TouchableOpacity>
              </View>
            )}

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

      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
          <Ionicons name="home" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
          <Ionicons name="mail-outline" size={24} color={Colors.light.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={24} color={Colors.light.icon} />
        </TouchableOpacity>
      </View>
 */}
      <StepCompletionModal
        visible={showCompletionModal}
        stepNumber={completedStep?.number || 0} 
        stepTitle={completedStep?.title || ""}
        onContinue={handleModalContinue}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
    color: Colors.light.text,
    marginBottom: 8,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  techniqueSubtitle: {
    fontSize: 16,
    color: Colors.light.icon,
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
    color: Colors.light.text,
    flex: 1,
    marginLeft: 12,
  },
  progressBadge: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.primary,
  },
  stepCard: {
    backgroundColor: Colors.light.background,
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
    color: Colors.light.text,
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
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#92400E",
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
    color: Colors.light.text,
    minWidth: 60,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.light.icon,
    flex: 1,
    lineHeight: 20,
  },
  tipsContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.primary,
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
    color: Colors.light.primary,
  },
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 13,
    color: Colors.light.primary,
    fontStyle: "italic",
    lineHeight: 18,
    paddingLeft: 12,
  },
  tipDuration: {
    fontSize: 12,
    color: Colors.lightGreen,
    fontWeight: "500",
    paddingLeft: 12,
    marginTop: 2,
  },
  timerControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    gap: 12,
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    minWidth: 120,
    justifyContent: "center",
  },
  pauseButton: {
    backgroundColor: "#EF4444",
  },
  playButton: {
    backgroundColor: Colors.lightGreen,
  },
  completeButton: {
    backgroundColor: Colors.light.primary,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: Colors.light.secondary,
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
    backgroundColor: Colors.light.background,
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
    color: Colors.light.icon,
    fontWeight: "500",
  },
  loadingTipsText: {
    fontSize: 12,
    color: Colors.light.icon,
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
    color: Colors.light.primary,
    fontWeight: "500",
    flex: 1,
    lineHeight: 20,
  },
  tipIndicator: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  tipIndicatorText: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  lockOverlay: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 2,
  },
  lockIcon: {
    marginLeft: 8,
  },
})
