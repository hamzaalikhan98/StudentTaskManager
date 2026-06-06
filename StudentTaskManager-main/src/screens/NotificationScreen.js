import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { colors } from "../components/colors";
import CustomButton from "../components/CustomButton";

export default function NotificationScreen({ navigation }) {
  const tasks = useSelector((state) => state.tasks.items);

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High" && !task.completed
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="notifications" size={50} color="#FFFFFF" />
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>Academic reminders and task updates</Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: colors.pendingBg }]}>
          <Text style={styles.summaryNumber}>{pendingTasks.length}</Text>
          <Text style={styles.summaryText}>Pending</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: colors.doneBg }]}>
          <Text style={[styles.summaryNumber, { color: colors.success }]}>
            {completedTasks.length}
          </Text>
          <Text style={styles.summaryText}>Completed</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: "#FEE2E2" }]}>
          <Text style={[styles.summaryNumber, { color: colors.danger }]}>
            {highPriorityTasks.length}
          </Text>
          <Text style={styles.summaryText}>Urgent</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Today&apos;s Updates</Text>

      {tasks.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptyText}>
            Add tasks to receive academic reminders.
          </Text>
        </View>
      ) : (
        <>
          {highPriorityTasks.map((task) => (
            <View style={styles.notificationCard} key={`high-${task.id}`}>
              <View style={[styles.iconBox, { backgroundColor: "#FEE2E2" }]}>
                <Ionicons name="alert-circle" size={26} color={colors.danger} />
              </View>

              <View style={styles.textBox}>
                <Text style={styles.cardTitle}>High Priority Task</Text>
                <Text style={styles.cardText}>{task.title}</Text>
                <Text style={styles.dateText}>Due: {task.dueDate || task.date}</Text>
              </View>
            </View>
          ))}

          {pendingTasks.map((task) => (
            <View style={styles.notificationCard} key={`pending-${task.id}`}>
              <View style={[styles.iconBox, { backgroundColor: colors.pendingBg }]}>
                <Ionicons name="time" size={26} color={colors.warning} />
              </View>

              <View style={styles.textBox}>
                <Text style={styles.cardTitle}>Pending Task</Text>
                <Text style={styles.cardText}>{task.title}</Text>
                <Text style={styles.dateText}>Due: {task.dueDate || task.date}</Text>
              </View>
            </View>
          ))}

          {completedTasks.map((task) => (
            <View style={styles.notificationCard} key={`done-${task.id}`}>
              <View style={[styles.iconBox, { backgroundColor: colors.doneBg }]}>
                <Ionicons name="checkmark-circle" size={26} color={colors.success} />
              </View>

              <View style={styles.textBox}>
                <Text style={styles.cardTitle}>Task Completed</Text>
                <Text style={styles.cardText}>{task.title}</Text>
                <Text style={styles.dateText}>Good job! Keep going.</Text>
              </View>
            </View>
          ))}
        </>
      )}

      <CustomButton title="Back to Dashboard" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },

  header: {
    backgroundColor: colors.secondary,
    borderRadius: 28,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
    elevation: 6,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 10,
  },

  subtitle: {
    color: "#E0F2FE",
    marginTop: 6,
    fontWeight: "700",
    textAlign: "center",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  summaryCard: {
    width: "31%",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  summaryNumber: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.warning,
  },

  summaryText: {
    color: colors.text,
    fontWeight: "800",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 15,
  },

  notificationCard: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  textBox: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
  },

  cardText: {
    color: colors.muted,
    marginTop: 4,
    fontWeight: "700",
  },

  dateText: {
    color: colors.secondary,
    marginTop: 4,
    fontWeight: "800",
    fontSize: 13,
  },

  emptyBox: {
    backgroundColor: colors.card,
    padding: 30,
    borderRadius: 24,
    alignItems: "center",
    elevation: 4,
  },

  emptyIcon: {
    fontSize: 55,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
    marginTop: 10,
  },

  emptyText: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    fontWeight: "600",
  },
});