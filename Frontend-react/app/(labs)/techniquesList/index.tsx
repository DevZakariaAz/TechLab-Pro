import React from "react";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import TechniqueCard from "@/components/TechniqueCard";

const TechniquesPage = () => {
  const array = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <>
      <Stack.Screen
        options={{
          title: "Techniques de Coloration",
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerRight: () => (
            <>
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </>
          ),
        }}
      />
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
          <FlatList
          showsHorizontalScrollIndicator={false}
            data={array}
            renderItem={({ item }) => <TechniqueCard />}
          />
      </SafeAreaView>
    </>
  );
};

export default TechniquesPage;
