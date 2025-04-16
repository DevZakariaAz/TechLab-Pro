import React, { useState } from 'react';
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
  FlatList
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors'; // Import your colors file

// Sample data for staining techniques
const STAINING_TECHNIQUES = [
  {
    id: '1',
    title: 'Hématoxyline-Éosine (H&E)',
    category: 'Colorations Histologiques',
    description: 'Coloration standard pour visualiser les structures cellulaires. Le noyau apparaît en bleu-violet et le cytoplasme en rose.',
    lastActivity: '2 min',
    isFavorite: true,
    image: require('@/assets/images/Technique2.png')
  },
  {
    id: '2',
    title: 'Trichrome de Masson',
    category: 'Colorations Histologiques',
    description: 'Utilisée pour différencier les fibres de collagène du muscle lisse. Le collagène apparaît en bleu, les noyaux en noir et le cytoplasme en rouge.',
    lastActivity: '15 min',
    isFavorite: true,
    image: require('@/assets/images/technique.png')
  },
  {
    id: '3',
    title: 'Reticuline (Gomori ou Wilder)',
    category: 'Colorations Spéciales pour Fibres',
    description: 'Met en évidence les fibres de réticuline qui apparaissent en noir sur un fond jaune ou brun clair.',
    lastActivity: '20 min',
    isFavorite: true,
    image: require('@/assets/images/Technique1.png')
  },
  {
    id: '4',
    title: 'Coloration de Van Gieson',
    category: 'Colorations Spéciales pour Fibres',
    description: 'Utilisée pour différencier le collagène du muscle lisse. Le collagène apparaît en rouge et le muscle en jaune.',
    lastActivity: '25 min',
    isFavorite: false,
    image: require('@/assets/images/Technique2.png')
  },
  {
    id: '5',
    title: 'Coloration de Gram',
    category: 'Colorations Microbiologiques',
    description: 'Différencie les bactéries Gram positif (violet) des bactéries Gram négatif (rose).',
    lastActivity: '30 min',
    isFavorite: false,
    image: require('@/assets/images/technique.png')
  },
  {
    id: '6',
    title: 'Coloration de Ziehl-Neelsen',
    category: 'Colorations Microbiologiques',
    description: 'Utilisée pour identifier les bactéries acido-alcoolo-résistantes comme Mycobacterium tuberculosis.',
    lastActivity: '1h',
    isFavorite: false,
    image: require('@/assets/images/Technique2.png')
  }
];

// Category filter buttons
const CATEGORIES = [
  { id: 'all', name: 'Toutes' },
  { id: 'histologiques', name: 'Histologiques' },
  { id: 'fibres', name: 'Fibres' },
  { id: 'microbiologiques', name: 'Microbiologiques' },
];

const StainingTechniquesApp = () => {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter techniques based on category and search query
  const filteredTechniques = STAINING_TECHNIQUES.filter(technique => {
    const matchesCategory = activeCategory === 'all' || 
                           (activeCategory === 'histologiques' && technique.category.includes('Histologiques')) ||
                           (activeCategory === 'fibres' && technique.category.includes('Fibres')) ||
                           (activeCategory === 'microbiologiques' && technique.category.includes('Microbiologiques'));
    
    const matchesSearch = technique.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         technique.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && (searchQuery === '' || matchesSearch);
  });

  const toggleFavorite = (id) => {
    // In a real app, you would update state here
    console.log(`Toggle favorite for ${id}`);
  };

  const renderTechniqueItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { 
        backgroundColor: colorScheme === 'dark' ? colors.secondary : '#fff',
        shadowColor: colors.text,
        borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }]}
      activeOpacity={0.9}
    >
      <Image
        source={item.image} 
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardOverlay}>
        <TouchableOpacity 
          style={[styles.favoriteButton, { 
            backgroundColor: item.isFavorite ? Colors.lightGreen : 'rgba(255,255,255,0.3)' 
          }]}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons 
            name={item.isFavorite ? "heart" : "heart-outline"} 
            size={16} 
            color={item.isFavorite ? "#fff" : Colors.lightGreen} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContent}>
        <View>
          <Text style={[styles.categoryLabel, { color: Colors.lightGreen }]}>
            {item.category}
          </Text>
          <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.cardDescription, { color: colors.icon }]} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        
        <View style={styles.cardFooter}>
          <View style={styles.activityContainer}>
            <Feather name="clock" size={14} color={colors.icon} style={styles.activityIcon} />
            <Text style={[styles.lastActivity, { color: colors.icon }]}>
              Dernière activité: {item.lastActivity}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.viewButton, { backgroundColor: Colors.lightGreen }]}
          >
            <Text style={styles.viewButtonText}>Voir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Techniques de Coloration
          </Text>
          <TouchableOpacity style={styles.menuButton}>
            <Feather name="more-vertical" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={[styles.searchContainer, { 
          backgroundColor: colorScheme === 'dark' ? colors.secondary : '#f5f5f5',
          borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
        }]}>
          <Ionicons name="search" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Rechercher une technique..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.icon} />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Category Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && { 
                  backgroundColor: Colors.lightGreen,
                  borderColor: Colors.lightGreen
                },
                activeCategory !== category.id && { 
                  borderColor: colors.icon,
                  backgroundColor: 'transparent' 
                }
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  { color: activeCategory === category.id ? '#fff' : colors.icon }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Techniques List */}
      <FlatList
        data={filteredTechniques}
        renderItem={renderTechniqueItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="search" size={50} color={colors.icon} />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              Aucune technique trouvée
            </Text>
          </View>
        }
      />

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { 
        backgroundColor: colorScheme === 'dark' ? colors.background : '#fff',
        borderTopColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f0f0f0' 
      }]}>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="home" size={24} color={Colors.lightGreen} />
          <Text style={[styles.navLabel, { color: Colors.lightGreen }]}>Accueil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Feather name="bookmark" size={24} color={colors.tabIconDefault} />
          <Text style={[styles.navLabel, { color: colors.tabIconDefault }]}>Favoris</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Feather name="book-open" size={24} color={colors.tabIconDefault} />
          <Text style={[styles.navLabel, { color: colors.tabIconDefault }]}>Guide</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={24} color={colors.tabIconDefault} />
          <Text style={[styles.navLabel, { color: colors.tabIconDefault }]}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
    fontSize: 16,
  },
  categoryContainer: {
    paddingBottom: 16,
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: 16,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    marginRight: 4,
  },
  lastActivity: {
    fontSize: 12,
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    paddingBottom: 25, // Extra padding for iPhone X+ models
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default StainingTechniquesApp;