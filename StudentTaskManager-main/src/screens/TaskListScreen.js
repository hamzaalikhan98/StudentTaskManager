import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleTaskStatus } from "../redux/taskSlice";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import { colors } from "../components/colors";

export default function TaskListScreen({ navigation }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);

  return (
    <View style={styles.container}>
      <Header
        title="My Tasks"
        subtitle="Manage your assignments, quizzes, labs and projects."
      />

      {tasks.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>No Tasks Yet</Text>
          <Text style={styles.emptyText}>Create a new task from the Add tab.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onPress={() => navigation.navigate("TaskDetail", { taskId: item.id })}
              onToggle={() => dispatch(toggleTaskStatus(item.id))}
              onDelete={() => dispatch(deleteTask(item.id))}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 60,
  },

  emptyBox: {
    backgroundColor: colors.card,
    padding: 30,
    borderRadius: 26,
    alignItems: "center",
    elevation: 4,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
  },

  emptyText: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    fontWeight: "600",
  },
});