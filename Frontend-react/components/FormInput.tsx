import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

interface FormInputProps {
  title: string;
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
  styles: object;
  StartIcon?: React.ReactNode;
  EndIcon?: React.ReactNode;
}

const FormInput = ({
  title,
  value,
  placeholder,
  onChange,
  secureTextEntry = false,
  styles,
  StartIcon = null,
  EndIcon = null,
}: FormInputProps) => {
  return (
    <View style={[localStyles.container, styles]}>
      {StartIcon? StartIcon: ""}
      <TextInput
        style={{ height: 50, width: "100%", fontSize: 16 }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onChangeText={(text) => onChange(text)}
        secureTextEntry={secureTextEntry}
      />
      {EndIcon? EndIcon: ""}
    </View>
  );
};

export default FormInput;

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 30,
    paddingHorizontal: 15,
  },
});
