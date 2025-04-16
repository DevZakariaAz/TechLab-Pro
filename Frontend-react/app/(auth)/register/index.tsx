// namespace: (auth)/register
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect, Stack, useRouter } from "expo-router";
import FormInput from "@/components/FormInput";
import Checkbox from "expo-checkbox";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { apiRegister } from "@/api/register";

const theme = Colors.light;
const Register = () => {
  const [form, setFrom] = useState({
    name: "",
    email: "",
    phone: "",
    cin: "",
    cnt: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState({name: ""});
  const [showErrorView, setShowErrorView] = useState(false);
  const router = useRouter();
  // const singUp = () => {
  //   if(checked === false) return;
  //   let {name, email, phone, cin, cnt, password} = form;
  //   if((name === "" || name.length < 3) || (email === "" || email.length < 10) || (phone === "" || phone.length < 8) || (cin === "" || cin.length < 3) || (cnt === "" || cnt.length < 3) || (password === "" || password.length < 6)){
  //     setError({name: "Tout les Donner est Obligatoire"});
  //     showError();
  //     return;}
      // apiRegister({name, email, phone, cin, cnt, password}).then((res) => {
      //   if(res.status === true){
      //     router.replace("/(auth)/otpPage");
      //   }else{
      //     setError({name: res.message});
      //     showError();
      //   }
      // });
  // }
  const singUp = () => {
    router.replace("/(auth)/otpPage");
  }
  async function showError () {
    setShowErrorView(true);
    setTimeout(() => {
      setShowErrorView(false);
    }, 5000);
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: "S'inscrire",
          headerTitleAlign: "center",
          headerBackVisible: true,
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <View style={{ width: "100%", padding: 20, gap: 20 }}>
            <FormInput
              title="Nom"
              value={form.name}
              placeholder="Entrez votre nom"
              onChange={(text) => {
                setFrom({ ...form, name: text });
              }}
              styles={{borderColor: error.name !== "" && form.name === "" ? "red" : "#ccc", borderWidth: 1, borderRadius: 30}}
              StartIcon={
                <>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#999"
                    style={{ margin: 8 }}
                  />
                </>
              }
            />

            <FormInput
              title="Eamil"
              value={form.email}
              placeholder="Entrez votre email"
              onChange={(text) => {
                setFrom({ ...form, email: text });
              }}
              styles={{borderColor: error.name !== "" && form.email === "" ? "red" : "#ccc", borderWidth: 1, borderRadius: 30}}
              StartIcon={
                <>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#999"
                    style={{ margin: 8 }}
                  />
                </>
              }
            />

            <FormInput
              title="Telephone"
              value={form.phone}
              placeholder="Entrez votre telephone"
              onChange={(text) => {
                setFrom({ ...form, phone: text });
              }}
              styles={{borderColor: error.name !== "" && form.phone === "" ? "red" : "#ccc", borderWidth: 1, borderRadius: 30}}
              StartIcon={
                <>
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color="#999"
                    style={{ margin: 8 }}
                  />
                </>
              }
            />

            <FormInput
              title="CIN"
              value={form.cin}
              placeholder="Entrez votre CIN"
              onChange={(text) => {
                setFrom({ ...form, cin: text });
              }}
              styles={{borderColor: error.name !== "" && form.cin === "" ? "red" : "#ccc", borderWidth: 1, borderRadius: 30}}
              StartIcon={
                <>
                  <Ionicons
                    name="card-outline"
                    size={20}
                    color="#999"
                    style={{ margin: 8 }}
                  />
                </>
              }
            />

            <FormInput
              title="CNT"
              value={form.cnt}
              placeholder="Entrez votre CNT/PPR"
              onChange={(text) => {
                setFrom({ ...form, cnt: text });
              }}
              styles={{borderColor: error.name !== "" && form.cnt === "" ? "red" : "#ccc", borderWidth: 1, borderRadius: 30}}
              StartIcon={
                <>
                  <Ionicons
                    name="card-outline"
                    size={20}
                    color="#999"
                    style={{ margin: 8 }}
                  />
                </>
              }
            />
            <FormInput
              title="Password"
              value={form.password}
              placeholder="Entrez votre mot de passe"
              onChange={(text) => {
                setFrom({ ...form, password: text });
              }}
              secureTextEntry={showPassword}
              styles={{borderColor: error.name !== "" && form.password === "" ? "red" : "#ccc", borderWidth: 1, borderRadius: 30}}
              StartIcon={
                <>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#999"
                    style={{ margin: 8 }}
                  />
                </>
              }
              EndIcon={
                <>
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#999"
                      style={{ marginRight: 8 }}
                    />
                  </TouchableOpacity>
                </>
              }
            />
            <View style={styles.checkBox}>
              <Checkbox value={checked} onValueChange={setChecked} />
              <Text style={styles.CheckboxText}>
                J'accepte les conditions d'utilisation et
                <Link href={"index"} style={styles.CheckboxLink}>
                  la politique de confidentialité
                </Link>
                de Medidoc.
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.registerButton,
                { backgroundColor: checked ? theme.primary : "#ccc" },
              ]}
              onPress={singUp}
            >
              <Text>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={[styles.error, {display: showErrorView ? "flex" : "none"}]}>
        <Text>{error.name}</Text>
      </View>
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
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  CheckboxText: {
    color: "#3B4453",
  },
  CheckboxLink: {
    color: Colors.lightGreen,
    textDecorationLine: "underline",
  },
  registerButton: {
    display: "flex",
    width: "100%",
    marginBlock: 20,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    width: "60%",
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",
    position: "absolute",
    marginTop: "170%",
    marginStart: "35%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  }
});
