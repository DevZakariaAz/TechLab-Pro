import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface TechDetailStepProps {
    stepTitle: string;
    stepDuration: string;
    stepNumber: string;
}

const TechDetailStep = ({stepTitle, stepDuration, stepNumber}: TechDetailStepProps) => {
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.stepTitle}>{stepTitle}</Text>
            <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
            <Text style={[styles.stepDuration, {color: "#ADADAD"}]}>Durée estimée </Text>
            <Text style={[styles.stepDuration, {color: "#199A8E"}]}>{stepDuration}</Text>
            </View>
        </View>
        <View style={{flex: 1, alignItems: "flex-end", justifyContent: "center"}}>
            <Text style={styles.stepNumber}>Étape {stepNumber}</Text>
        </View>
    </View>
  )
}

export default TechDetailStep

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    padding: 10,
    marginBottom: 20,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "#E8F3F1",
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  stepTitle: {
    fontSize: 16,
    color: "#000",
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#199A8E",
  },
  stepDuration: {
    fontSize: 14,
  },
})
