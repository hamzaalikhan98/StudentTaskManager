import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks, saveTasks } from "../redux/taskSlice";
import { colors } from "../components/colors";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  useEffect(() => {
    dispatch(saveTasks(tasks));
  }, [tasks]);

  const completed = tasks.filter((item) => item.completed).length;
  const pending = tasks.length - completed;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerTextBox}>
          <Text style={styles.greeting}>Good Morning, Asad! 👋</Text>
          <Text style={styles.subtitle}>Let's make today productive.</Text>
        </View>

        <View style={styles.topIcons}>
          <TouchableOpacity
            style={styles.iconBoxTop}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.text}
            />
            <View style={styles.dot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBoxTop}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.starBox}>
          <Text style={styles.star}>⭐</Text>
        </View>

        <View style={styles.heroMiddle}>
          <Text style={styles.heroTitle}>Stay Focused</Text>
          <Text style={styles.heroText}>
            Track assignments, quizzes, labs and project work beautifully.
          </Text>
        </View>

        <Text style={styles.bookIcon}>📚</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.totalBg }]}>
            <Ionicons
              name="clipboard-outline"
              size={28}
              color={colors.secondary}
            />
          </View>

          <Text style={styles.totalNumber}>{tasks.length}</Text>
          <Text style={styles.cardTitle}>Tasks</Text>
          <Text style={styles.cardSub}>Total tasks</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.pendingBg }]}>
            <Ionicons
              name="hourglass-outline"
              size={28}
              color={colors.warning}
            />
          </View>

          <Text style={[styles.totalNumber, { color: colors.warning }]}>
            {pending}
          </Text>
          <Text style={styles.cardTitle}>Pending</Text>
          <Text style={styles.cardSub}>Tasks pending</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.doneBg }]}>
            <Ionicons
              name="checkmark-circle"
              size={30}
              color={colors.success}
            />
          </View>

          <Text style={[styles.totalNumber, { color: colors.success }]}>
            {completed}
          </Text>
          <Text style={styles.cardTitle}>Done</Text>
          <Text style={styles.cardSub}>Completed</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.actionCard, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate("Add Task")}
      >
        <View style={styles.whiteCircle}>
          <Ionicons name="add" size={32} color={colors.accent} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.actionTitle}>Add New Task</Text>
          <Text style={styles.actionText}>Create and add a new task</Text>
        </View>

        <Ionicons name="chevron-forward-circle" size={40} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionCard, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate("Tasks")}
      >
        <View style={styles.whiteCircle}>
          <Ionicons name="list" size={30} color={colors.primary} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.actionTitle}>View Tasks</Text>
          <Text style={styles.actionText}>Manage your academic tasks</Text>
        </View>

        <Ionicons name="chevron-forward-circle" size={40} color="#fff" />
      </TouchableOpacity>
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
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTextBox: {
    flex: 1,
    paddingRight: 10,
  },

  greeting: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 15,
    color: colors.muted,
    fontWeight: "600",
  },

  topIcons: {
    flexDirection: "row",
    gap: 8,
  },

  iconBoxTop: {
    height: 48,
    width: 48,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  dot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.danger,
  },

  hero: {
    marginTop: 25,
    backgroundColor: colors.secondary,
    borderRadius: 28,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 6,
  },

  starBox: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  star: {
    fontSize: 38,
  },

  heroMiddle: {
    flex: 1,
    marginHorizontal: 18,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },

  heroText: {
    color: "#EAF2FF",
    marginTop: 8,
    lineHeight: 22,
    fontWeight: "600",
  },

  bookIcon: {
    fontSize: 55,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  statCard: {
    width: "31%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 15,
    elevation: 5,
  },

  statIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  totalNumber: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "900",
    color: colors.secondary,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
  },

  cardSub: {
    color: colors.muted,
    marginTop: 3,
  },

  actionCard: {
    marginTop: 22,
    padding: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },

  whiteCircle: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  actionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
  },

  actionText: {
    color: "#fff",
    marginTop: 5,
  },
});