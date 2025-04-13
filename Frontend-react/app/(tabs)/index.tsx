import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo icons if not already done

export default function AccueilPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accueil</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

 

      <View style={styles.selectionContainer}>
        <View style={styles.selectionHeader}>
          <Ionicons name="bulb-outline" size={22} color="#999" />
          <Text style={styles.selectionTitle}>Sélectionnez votre laboratoire</Text>
        </View>

        <ScrollView style={styles.labOptions} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.labCard}>
            <View style={styles.labInfo}>
              <Text style={styles.labName}>Centre d'Analyse</Text>
              <Text style={styles.labName}>Anatomopathologique</Text>
            </View>
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} // Replace with your microscope image
              style={styles.labImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.labCard}>
            <View style={styles.labInfo}>
              <Text style={styles.labName}>Laboratoire d'Anatomie et</Text>
              <Text style={styles.labName}>de Cytologie Pathologique</Text>
            </View>
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} // Replace with your document/screen image
              style={styles.labImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.labCard}>
            <View style={styles.labInfo}>
              <Text style={styles.labName}>Institut d'Histopathologie</Text>
              <Text style={styles.labName}>et Cytodiagnostic</Text>
            </View>
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} // Replace with your test tubes image
              style={styles.labImage}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  selectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  selectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectionTitle: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  labOptions: {
    flex: 1,
  },
  labCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8f4f4',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  labInfo: {
    flex: 1,
  },
  labName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  labImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
    height: 60,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 

