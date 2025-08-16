"use client"

import { useEffect, useState } from "react"
import { useRouter, Stack } from "expo-router"

import { getTechniques } from "../../../api/getTechniques"
import { getCategories } from "@/api/getCategories"

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { Colors } from "../../../constants/Colors"

const StainingTechniquesApp = () => {
  const colorScheme = useColorScheme() || "light"
  const colors = Colors[colorScheme]
  const router = useRouter()

  const [techniques, setTechniques] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryMap, setCategoryMap] = useState({})
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [techniquesResult, categoriesResult] = await Promise.all([getTechniques(), getCategories()])

      if (techniquesResult.success) {
        setTechniques(techniquesResult.techniques)
      } else {
        console.error(techniquesResult.message)
      }

      if (categoriesResult.success) {
        setCategories(categoriesResult.categories)

        const mapping = {}
        categoriesResult.categories.forEach((cat) => {
          if (cat.id !== "all") {
            mapping[cat.id] = cat.name
          }
        })
        setCategoryMap(mapping)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredTechniques = techniques.filter((technique) => {
    let matchesCategory = false

    if (activeCategory === "all") {
      matchesCategory = true
    } else {
      if (technique.category_id) {
        // Convert both to strings for consistent comparison
        matchesCategory = technique.category_id.toString() === activeCategory.toString()
      } else if (technique.category) {
        // Fallback for techniques with category names instead of IDs
        const categoryName = technique.category.toLowerCase()
        const activeCategoryName = categories
          .find((cat) => cat.id.toString() === activeCategory.toString())
          ?.name?.toLowerCase()
        matchesCategory = categoryName === activeCategoryName
      }
    }

    const matchesSearch =
      technique.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (technique.category && technique.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (technique.category_id && categoryMap[technique.category_id]?.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && (searchQuery === "" || matchesSearch)
  })

  const toggleFavorite = (id) => {
    console.log(`Toggle favorite for ${id}`)
  }

  const getCategoryDisplayName = (technique) => {
    if (technique.category_id && categoryMap[technique.category_id]) {
      return categoryMap[technique.category_id]
    }
    return technique.category || "Non classé"
  }

  const renderTechniqueItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colorScheme === "dark" ? colors.secondary : "#fff",
        },
      ]}
      onPress={() => router.push(`/details/${item.id}`)}
      activeOpacity={0.95}
    >
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
        <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item.id)}>
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={18}
            color={item.isFavorite ? "#fff" : "#fff"}
          />
        </TouchableOpacity>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{getCategoryDisplayName(item)}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.cardDescription, { color: colors.icon }]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <TouchableOpacity style={styles.viewButton} onPress={() => router.push(`/details/${item.id}`)}>
            <Text style={styles.viewButtonText}>Voir</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" style={styles.viewButtonIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
      <Stack.Screen
        options={{
          title: "Accueil",
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerRight: () => (
            <>
              <TouchableOpacity style={styles.settingsButton}>
                <Ionicons
                  name="options-outline"
                  size={24}
                  color={colors.text}
                  onPress={() => {
                    router.push("/Settings")
                  }}
                />
              </TouchableOpacity>
            </>
          ),
        }}
      />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Techniques de Coloration</Text>
        </View>

        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: colorScheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            },
          ]}
        >
          <Ionicons name="search" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Rechercher une technique..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={colors.icon} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id
                  ? { backgroundColor: Colors.lightGreen }
                  : { backgroundColor: colorScheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" },
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  {
                    color: activeCategory === category.id ? "#fff" : colors.text,
                  },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.lightGreen} />
          <Text style={[styles.loadingText, { color: colors.text }]}>Chargement des techniques...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTechniques}
          renderItem={renderTechniqueItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="search" size={60} color={colors.icon} />
              <Text style={[styles.emptyText, { color: colors.text }]}>Aucune technique trouvée</Text>
              <Text style={[styles.emptySubtext, { color: colors.icon }]}>
                Essayez de modifier vos critères de recherche
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "400",
  },
  categoryContainer: {
    flexDirection: "row",
    paddingBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImageContainer: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    opacity: 0.8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  viewButtonIcon: {
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
  },
})

export default StainingTechniquesApp
