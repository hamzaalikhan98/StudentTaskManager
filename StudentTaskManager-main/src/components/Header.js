import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "./colors";

export default function Header({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: colors.muted,
    lineHeight: 22,
  },
});