import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function stepsList() {
  return (
    <>
    <Stack.Screen options={{
      headerShown: true,
      headerTitleAlign: "center",
      headerTitle: "Instructions Détaillées",
      headerBackVisible: true,
    }} />
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hématoxyline-Éosine (H&E)</Text>
        <Text style={styles.subtitle}>Colorations Histologiques de Base</Text>
      </View>
      
      <View style={styles.stepsHeaderContainer}>
        <Ionicons name="list-outline" size={20} color="#333" />
        <Text style={styles.stepsHeaderText}>Liste des Étapes :</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Step 1 - Active with pause */}
        <View style={[styles.stepContainer, styles.activeStepContainer]}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepTitle}>Étape 1 : Cristal Violet</Text>
            <View style={styles.timerContainer}>
              <Ionicons name="time-outline" size={16} color="#333" />
              <Text style={styles.timerText}>04:32</Text>
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Réactif</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>Cristal Violet</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Temps</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>Durée estimée 5 min</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Conseil</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>Appliquer uniformément</Text>
            </View>
          </View>
          
          <View style={styles.pauseRow}>
            <Text style={styles.pauseText}>Pause</Text>
            <TouchableOpacity style={styles.restartButton}>
              <Ionicons name="refresh" size={16} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Step 2 */}
        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepTitle}>Étape 2 : Décoloration à l'alcool</Text>
            <View style={styles.todoContainer}>
              <Text style={styles.todoText}>À faire</Text>
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Réactif</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>Décoloration à l'alcool</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Temps</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>Durée estimée 2 min</Text>
            </View>
          </View>
        </View>
        
        {/* Step 3 */}
        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepTitle}>Étape 3 : Contre-coloration à la Saframine</Text>
            <View style={styles.todoContainer}>
              <Text style={styles.todoText}>À faire</Text>
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Réactif</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>La saframine</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Temps</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>Durée estimée 2 min</Text>
            </View>
          </View>
        </View>
        
        {/* Step 4 */}
        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepTitle}>Étape 4 : Lugol</Text>
            <View style={styles.todoContainer}>
              <Text style={styles.todoText}>À faire</Text>
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Réactif</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>Cristal Violet</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Temps</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>Durée estimée 7 min</Text>
            </View>
          </View>
        </View>
        
        {/* Step 5 */}
        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepTitle}>Étape 5 : Décoloration à l'alcool</Text>
            <View style={styles.todoContainer}>
              <Text style={styles.todoText}>À faire</Text>
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Réactif</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>Cristal Violet</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailArrow}>→</Text>
              <Text style={styles.detailLabel}>Temps</Text>
              <Text style={styles.detailColon}>:</Text>
              <Text style={styles.detailValue}>Durée estimée 6 min</Text>
            </View>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 24,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9B9B9B',
  },
  stepsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  stepsHeaderText: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  activeStepContainer: {
    borderColor: '#1AA39D',
    borderWidth: 2,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timerText: {
    marginLeft: 4,
    color: '#333',
    fontWeight: '500',
    fontSize: 13,
  },
  pauseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  pauseText: {
    color: '#FF6B6B',
    marginRight: 8,
    fontSize: 14,
  },
  restartButton: {
    backgroundColor: '#E8F5E9',
    padding: 4,
    borderRadius: 12,
  },
  todoContainer: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  todoText: {
    color: '#4CAF50',
    fontSize: 12,
  },
  detailsContainer: {
    marginTop: 4,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  detailArrow: {
    color: '#1AA39D',
    width: 16,
    fontSize: 14,
  },
  detailLabel: {
    width: 50,
    fontSize: 14,
    color: '#555',
  },
  detailColon: {
    width: 10,
    textAlign: 'center',
    color: '#555',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  tabItem: {
    alignItems: 'center',
    padding: 10,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
});