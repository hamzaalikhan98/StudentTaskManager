import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { colors } from "../components/colors";

export default function CategoryScreen() {
  const tasks = useSelector((state) => state.tasks.items);

  const categories = ["Assignment", "Quiz", "Lab", "Project", "Presentation"];
  const countByCategory = (cat) => tasks.filter((task) => task.category.toLowerCase() === cat.toLowerCase()).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Categories" subtitle="Tasks are organized according to academic work type." />

      {categories.map((cat) => (
        <View style={styles.card} key={cat}>
          <Text style={styles.name}>{cat}</Text>
          <Text style={styles.count}>{countByCategory(cat)} Tasks</Text>
        </View>
      ))}
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
  },
  card: {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },
  count: {
    color: colors.primary,
    fontWeight: "800",
  },
});
