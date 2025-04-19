import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Styles for the bottom navigation
const styles = {
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    height: 60,
    zIndex: 1,  // Ensures it stays above other content
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50', // Active item color (e.g., light green)
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
  },
};

const _layout = () => {
  const colorScheme = useColorScheme(); // Get current color scheme (light/dark)
  const colors = {
    background: colorScheme === 'dark' ? '#121212' : '#ffffff',
    icon: colorScheme === 'dark' ? '#fff' : '#000',
    lightGreen: '#4caf50',
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Header Section for techniques list */}
        <Stack>
          <Stack.Screen
            name="techniquesList"
            options={{
              title: "Techniques de Coloration",
              headerTitleAlign: "center",
              headerBackVisible: true,
              headerRight: () => (
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
              ),
            }}
          />
        </Stack>
        {/* Bottom Navigation */}
        <View
          style={[
            styles.bottomNav,
            {
              backgroundColor: colorScheme === 'dark' ? colors.background : '#fff',
              borderTopColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f0f0f0',
            },
          ]}
        >
          <TouchableOpacity style={styles.navItemActive}>
            <Ionicons name="home" size={24} color={colors.lightGreen} />
            <Text style={[styles.navLabel, { color: colors.lightGreen }]}>Accueil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Feather name="bookmark" size={24} color={colors.icon} />
            <Text style={[styles.navLabel, { color: colors.icon }]}>Favoris</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Feather name="user" size={24} color={colors.icon} />
            <Text style={[styles.navLabel, { color: colors.icon }]}>Profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default _layout;
