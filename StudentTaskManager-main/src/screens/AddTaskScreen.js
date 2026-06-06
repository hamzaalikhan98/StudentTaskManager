import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import CustomButton from "../components/CustomButton";
import { colors } from "../components/colors";

export default function AddTaskScreen({ navigation }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Assignment");
  const [priority, setPriority] = useState("High");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formattedDate = dueDate.toLocaleDateString();

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setDueDate(selectedDate);
  };

  const handleAdd = () => {
    if (!title || !description) {
      Alert.alert("Missing Data", "Please enter title and task description");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      category,
      priority,
      dueDate: formattedDate,
      description,
      file: null,
      submittedAt: null,
      date: new Date().toDateString(),
      completed: false,
    };

    dispatch(addTask(newTask));
    Alert.alert("Task Created", "Task added successfully");
    navigation.navigate("Tasks");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New Task ✨</Text>
        <Text style={styles.subtitle}>
          Add task details. File will be submitted after completion.
        </Text>
      </View>

      <Text style={styles.label}>Task Title</Text>
      <View style={styles.inputBox}>
        <Ionicons name="create-outline" size={22} color={colors.primary} />
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.inputBox}>
        <Ionicons name="book-outline" size={22} color={colors.secondary} />
        <TextInput
          style={styles.input}
          placeholder="Assignment / Quiz / Lab"
          value={category}
          onChangeText={setCategory}
        />
      </View>

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityRow}>
        {["High", "Medium", "Low"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.priorityBtn,
              priority === item && {
                backgroundColor:
                  item === "High"
                    ? colors.danger
                    : item === "Medium"
                    ? colors.warning
                    : colors.success,
              },
            ]}
            onPress={() => setPriority(item)}
          >
            <Text
              style={[
                styles.priorityText,
                priority === item && { color: "#FFFFFF" },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter task description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity style={styles.dateBox} onPress={() => setShowPicker(true)}>
        <Ionicons name="calendar-outline" size={22} color={colors.accent} />
        <Text style={styles.dateText}>{formattedDate}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={handleDateChange}
        />
      )}

      <View style={styles.noteBox}>
        <Ionicons name="information-circle-outline" size={24} color={colors.secondary} />
        <Text style={styles.noteText}>
          After completing this task, open task details and submit your completed file.
        </Text>
      </View>

      <CustomButton title="Save Task" onPress={handleAdd} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 55, paddingBottom: 35 },

  header: {
    backgroundColor: colors.primary,
    padding: 24,
    borderRadius: 26,
    marginBottom: 24,
    elevation: 5,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
  },

  subtitle: {
    color: "#CCFBF1",
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
  },

  label: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 8,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    elevation: 2,
  },

  input: {
    flex: 1,
    padding: 15,
    fontSize: 15,
  },

  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  priorityBtn: {
    width: "31%",
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },

  priorityText: {
    fontWeight: "900",
    color: colors.text,
  },

  textArea: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 15,
    height: 125,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    elevation: 2,
  },

  dateBox: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },

  dateText: {
    marginLeft: 12,
    color: colors.text,
    fontWeight: "800",
  },

  noteBox: {
    backgroundColor: "#EEF2FF",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  noteText: {
    flex: 1,
    marginLeft: 10,
    color: colors.text,
    fontWeight: "700",
    lineHeight: 21,
  },
});