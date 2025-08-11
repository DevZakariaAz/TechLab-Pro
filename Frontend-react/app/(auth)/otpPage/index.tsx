import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { Stack, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import OTPTextView from "react-native-otp-textinput";

const theme = Colors.light;
const OtpPage = () => {
  const otpRef = useRef(null);
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: "Verification",
          headerBackVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Entrez le code de vérification</Text>
            <Text style={styles.subHeading}>
              Entrez le code que nous avons envoyé à votre numéro 08528188***{" "}
            </Text>
          </View>
          <View>
            <OTPTextView
              keyboardType="numeric"
              ref={otpRef}
              textInputStyle={{
                borderWidth: 1,
                borderColor: theme.primary,
                width: 50,
                height: 50,
                borderRadius: 10,
              }}
            />
          </View>
          <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity 
              style={styles.verifyButton}
              onPress={() => router.push("/newPassword")}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                Vérifier
              </Text>
            </TouchableOpacity>
            <Text>
              Vous n'avez pas reçu le code ?{" "}
              <TouchableOpacity
                onPress={() => {router.navigate("/(tabs)")}}
                style={{
                  display: "flex",
                  padding: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: Colors.lightGreen, marginTop: 4 }}>
                  Renvoyer
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OtpPage;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3B4453",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "400",
    color: "#3B4453",
    marginBottom: 20,
  },
  verifyButton: {
    display: "flex",
    width: "100%",
    marginBlock: 20,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.primary,
  },
});
