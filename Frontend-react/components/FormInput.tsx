import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

interface FormInputProps {
  title: string;
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  styles: object;
}

const FormInput = ({
  title,
  value,
  placeholder,
  onChange,
  styles,
}: FormInputProps) => {
  return (
    <View style={[localStyles.container, styles]}>
      <TextInput
        style={{ height: "100%", width: "100%", fontSize: 16 }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onChangeText={(text) => onChange(text)}
      />
    </View>
  );
};

export default FormInput;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderColor: '#E5E7EB',
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#F9FAFB",
  },
});
