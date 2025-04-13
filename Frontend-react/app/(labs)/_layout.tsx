import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="techniquesList"
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
      </Stack>
    </GestureHandlerRootView>
  );
};

export default _layout;
