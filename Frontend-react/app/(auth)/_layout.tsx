import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="register"
        options={{
          title: "S'inscrire",
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Se connecter",
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="otpPage"
        options={{
          title: "Vérification",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="resetPassword"
        options={{
          title: "Réinitialiser le mot de passe",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="newPassword"
        options={{
          title: "Nouveau mot de passe",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default _layout;
