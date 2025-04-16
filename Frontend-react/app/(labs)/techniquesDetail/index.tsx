import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import TechDetailStep from "@/components/TechDetailStep";
import { Ionicons } from "@expo/vector-icons";
const TechniquesDetail = () => {
  const array = [
    {
      title: "Hématoxyline-Éosine (H&E)",
      category: "Colorations Histologiques de Base",
      description:
        "La coloration de Gram permet de différencier les bactéries en fonction de la composition de leur paroi cellulaire",
      duration: "10 min",
      number: "1",
    },
    {
      title: "Hématoxyline-Éosine (H&E)",
      category: "Colorations Histologiques de Base",
      duration: "10 min",
      number: "2",
    },
    {
      title: "Hématoxyline-Éosine (H&E)",
      category: "Colorations Histologiques de Base",
      duration: "10 min",
      number: "3",
    },
    {
      title: "Hématoxyline-Éosine (H&E)",
      category: "Colorations Histologiques de Base",
      duration: "10 min",
      number: "4",
    },
  ];
  return (
    <>
      <Stack.Screen
        options={{
          title: "Détails de Technique",
          headerTitleAlign: "center",
          headerBackVisible: true,
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image
            source={require("@/assets/images/technique.png")}
            style={styles.image}
          />
          {/* Technique title and category */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.title}>Hématoxyline-Éosine (H&E)</Text>
            <Text style={styles.category}>
              Colorations Histologiques de Base
            </Text>
          </View>
          {/* Technique description */}
          <View>
            <Text style={styles.descriptionTitle}>
              Description de Technique :
            </Text>
            <Text style={styles.category}>
              La coloration de Gram permet de différencier les bactéries en
              fonction de la composition de leur paroi cellulaire
            </Text>
          </View>
          {/* Technique steps */}
          <View>
            <Text style={[styles.descriptionTitle, { marginBottom: 10 }]}>
              Étapes de la technique :
            </Text>
            {array.map((item) => {
              return (
                <>
                  <TechDetailStep
                    key={item.number}
                    stepTitle={item.title}
                    stepDuration={item.duration}
                    stepNumber={item.number}
                  />
                </>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("@/assets/images/sheare.png")} style={{width: 20, height: 20}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: "#199A8E", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20}}>
          <Text style={{fontSize: 16, fontWeight: "bold", color: "white"}}>Démarrer</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TechniquesDetail;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingBottom: 70,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 60,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
  },
  category: {
    fontSize: 14,
    color: "#ADADAD",
    marginTop: 10,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#000",
    marginTop: 20,
  },
  navBar: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    height: 70,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
});
