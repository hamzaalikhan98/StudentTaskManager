import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./colors";

export default function TaskCard({ task, onPress, onToggle, onDelete }) {
  const priorityColor =
    task.priority === "High"
      ? colors.danger
      : task.priority === "Medium"
      ? colors.warning
      : colors.success;

  const priorityBg =
    task.priority === "High"
      ? "#FEE2E2"
      : task.priority === "Medium"
      ? "#FEF3C7"
      : "#D1FAE5";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onToggle} style={styles.checkBox}>
          <Ionicons
            name={task.completed ? "checkmark" : "ellipse-outline"}
            size={24}
            color={task.completed ? "#FFFFFF" : colors.muted}
          />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={[styles.title, task.completed && styles.completed]}>
            {task.title}
          </Text>

          <Text style={styles.category}>
            {task.category}
          </Text>
        </View>

        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={22} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>

      <View style={styles.bottomRow}>
        <View style={styles.dateBox}>
          <Ionicons name="calendar-outline" size={16} color={colors.muted} />
          <Text style={styles.dateText}>
            {task.dueDate ? task.dueDate : task.date}
          </Text>
        </View>

        <View style={[styles.priorityBadge, { backgroundColor: priorityBg }]}>
          <Text style={[styles.priorityText, { color: priorityColor }]}>
            {task.priority}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 24,
    marginBottom: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.text,
  },

  completed: {
    textDecorationLine: "line-through",
    color: colors.muted,
  },

  category: {
    color: colors.secondary,
    fontWeight: "800",
    marginTop: 4,
    fontSize: 13,
  },

  description: {
    color: colors.muted,
    marginTop: 14,
    lineHeight: 21,
    fontWeight: "600",
  },

  bottomRow: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateText: {
    color: colors.muted,
    marginLeft: 6,
    fontWeight: "700",
  },

  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  priorityText: {
    fontSize: 12,
    fontWeight: "900",
  },
});