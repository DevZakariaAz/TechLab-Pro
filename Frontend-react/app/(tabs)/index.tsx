"use client"

import { useState } from "react"
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Dimensions, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Stack, useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

// Sample data with more details
const laboratories = [
  {
    id: 1,
    name: "Centre d'Analyse Anatomopathologique",
    specialty: "Spécialité en histologie et cytologie",
    rating: 4.8,
    distance: "2.3 km",
    image: require("@/assets/images/lab1.png"),
    route: "/(labs)/techniquesList",
  },
  {
    id: 2,
    name: "Laboratoire d'Anatomie et de Cytologie Pathologique",
    specialty: "Expertise en biopsies et analyses cellulaires",
    rating: 4.6,
    distance: "3.5 km",
    image: require("@/assets/images/lab2.png"),
    route: "/(labs)/techniquesList",
  },
  {
    id: 3,
    name: "Institut d'Histopathologie et Cytodiagnostic",
    specialty: "Analyses moléculaires et immunohistochimie",
    rating: 4.9,
    distance: "5.1 km",
    image: require("@/assets/images/lab3.png"),
    route: "/(labs)/techniquesList",
  },
]

export default function AccueilPage() {
  const router = useRouter()
  const [selectedLab, setSelectedLab] = useState(null)
  const scrollY = new Animated.Value(0)

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  })

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const halfStar = rating - fullStars >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={14} color="#FFD700" style={{ marginRight: 2 }} />)
      } else if (i === fullStars && halfStar) {
        stars.push(<Ionicons key={i} name="star-half" size={14} color="#FFD700" style={{ marginRight: 2 }} />)
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={14} color="#FFD700" style={{ marginRight: 2 }} />)
      }
    }
    return stars
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Accueil",
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <>
              <TouchableOpacity style={styles.notificationIcon} onPress={() => router.push("../(profile)/Notifications/")}>
                <Ionicons name="notifications-outline" size={24} color="#333" />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.welcomeSection, { opacity: headerOpacity }]}>
          <Text style={styles.welcomeText}>Bonjour,</Text>
          <Text style={styles.welcomeSubtext}>Trouvez le laboratoire idéal pour vos analyses</Text>
        </Animated.View>

        <View style={styles.selectionContainer}>
          <Animated.ScrollView
            style={styles.labOptions}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons name="flask-outline" size={22} color="#4a9ea1" />
                <Text style={styles.sectionTitle}>Laboratoires recommandés</Text>
              </View>
            </View>

            {laboratories.map((lab) => (
              <TouchableOpacity
                key={lab.id}
                style={[styles.labCard, selectedLab === lab.id && styles.selectedLabCard]}
                onPress={() => {
                  setSelectedLab(lab.id)
                  setTimeout(() => router.push(lab.route), 200)
                }}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={["rgba(74, 158, 161, 0.05)", "rgba(74, 158, 161, 0.15)"]}
                  style={styles.cardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />

                <View style={styles.labImageContainer}>
                  <Image source={lab.image} style={styles.labImage} />
                </View>

                <View style={styles.labInfo}>
                  <Text style={styles.labName} numberOfLines={2}>
                    {lab.name}
                  </Text>
                  <Text style={styles.labSpecialty} numberOfLines={1}>
                    {lab.specialty}
                  </Text>

                  <View style={styles.labMetaInfo}>
                    <View style={styles.ratingContainer}>
                      {renderStars(lab.rating)}
                      <Text style={styles.ratingText}>{lab.rating}</Text>
                    </View>

                    <View style={styles.distanceContainer}>
                      <Ionicons name="location-outline" size={14} color="#666" />
                      <Text style={styles.distanceText}>{lab.distance}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={20} color="#4a9ea1" />
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.sectionHeader} style={{ marginTop: 30 }}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons name="compass-outline" size={22} color="#4a9ea1" />
                <Text style={styles.sectionTitle}>Explorer par spécialité</Text>
              </View>
            </View>

            <View style={styles.specialtiesContainer}>
              {["Histologie", "Cytologie", "Immunologie", "Moléculaire"].map((specialty, index) => (
                <TouchableOpacity key={index} style={styles.specialtyButton}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ height: 100 }} />
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  welcomeSection: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: "#666",
    fontWeight: "400",
  },
  notificationIcon: {
    position: "relative",
    marginEnd: 20,
  },
  notificationBadge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#FF5252",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  selectionContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: "#4a9ea1",
    fontWeight: "500",
  },
  labOptions: {
    flex: 1,
  },
  labCard: {
    position: "relative",
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  selectedLabCard: {
    borderWidth: 2,
    borderColor: "#4a9ea1",
    transform: [{ scale: 0.98 }],
  },
  cardGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  labImageContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f0f9f9",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  labImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  labInfo: {
    padding: 20,
    paddingRight: 90,
  },
  labName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  labSpecialty: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  labMetaInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  arrowContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  specialtiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  specialtyButton: {
    width: (width - 60) / 2,
    height: 50,
    backgroundColor: "#f0f9f9",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  specialtyText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#4a9ea1",
  },
})
