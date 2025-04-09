import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import FormInput from "@/components/FormInput";

const Register = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "S'inscrire",
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerBackImage: () => <></>,
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <View style={{ width: "100%", padding: 20, gap: 20 }}>
            <FormInput
              title="Nom"
              value=""
              placeholder="Entrez votre nom"
              onChange={(text) => {}}
              styles={{}}
            />

            <FormInput
              title="Eamil"
              value=""
              placeholder="Entrez votre email"
              onChange={(text) => {}}
              styles={{}}
            />

            <FormInput
              title="Telephone"
              value=""
              placeholder="Entrez votre telephone"
              onChange={(text) => {}}
              styles={{}}
            />

            <FormInput
              title="CIN"
              value=""
              placeholder="Entrez votre CIN"
              onChange={(text) => {}}
              styles={{}}
            />

            <FormInput
              title="CNT"
              value=""
              placeholder="Entrez votre CNT/PPR"
              onChange={(text) => {}}
              styles={{}}
            />
            <FormInput
              title="Password"
              value=""
              placeholder="Entrez votre mot de passe"
              onChange={(text) => {}}
              styles={{}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
