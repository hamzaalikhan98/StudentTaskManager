import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "./colors";

export default function CustomButton({ title, onPress, type = "primary" }) {
  const bg =
    type === "danger"
      ? colors.danger
      : type === "success"
      ? colors.success
      : colors.secondary;

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: bg }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
    elevation: 4,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});