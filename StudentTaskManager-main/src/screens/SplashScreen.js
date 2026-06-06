import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../components/colors";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 1800);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>🎓</Text>
        <Text style={styles.title}>Academic Task Manager</Text>
        <Text style={styles.subtitle}>
          Smart way to organize university work
        </Text>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  card: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 30,
    padding: 35,
    alignItems: "center",
    elevation: 6,
  },
  icon: {
    fontSize: 70,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    textAlign: "center",
    marginVertical: 18,
    lineHeight: 24,
  },
});