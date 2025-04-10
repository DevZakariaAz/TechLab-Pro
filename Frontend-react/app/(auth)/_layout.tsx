import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="register" options={{
          title: 'S\'inscrire',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerBackImage: () => (<></>),
      }} />
      <Stack.Screen name="login" options={{
          title: 'Se connecter', 
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerBackImage: () => (<></>),
        }} />
    </Stack>
  );
};

export default _layout;
