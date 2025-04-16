import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const TechniqueCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/*when using data from back end remove require  */}
        <Image
          source={require("@/assets/images/technique.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Hématoxyline-Éosine (H&E)</Text>
          <Text style={styles.subtitle}>Colorations Histologiques</Text>
          <View style={styles.badge}>
            <Ionicons name="star" size={16} color="#199A8E" />
            <Text style={{ color: "#199A8E" }}>4.5</Text>
          </View>
          <Text style={styles.subtitle}>Dernière visite en 2 min</Text>
        </View>
      </View>
    </View>
  );
};

export default TechniqueCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#E8F3F1",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  main: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
  image: {
    width: "30%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  textContainer: {
    width: "100%",
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    backgroundColor: "#E8F3F1",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 4,
    marginVertical: 8,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
  },
});
