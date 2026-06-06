import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as DocumentPicker from "expo-document-picker";
import { submitTaskFile, deleteTask } from "../redux/taskSlice";
import CustomButton from "../components/CustomButton";
import { colors } from "../components/colors";

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params;
  const dispatch = useDispatch();

  const task = useSelector((state) =>
    state.tasks.items.find((item) => item.id === taskId)
  );

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Task Not Found</Text>
        <CustomButton title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const submitCompletedWork = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const selectedFile = result.assets[0];

      const fileData = {
        name: selectedFile.name,
        uri: selectedFile.uri,
        mimeType: selectedFile.mimeType,
        size: selectedFile.size,
      };

      dispatch(
        submitTaskFile({
          taskId: task.id,
          file: fileData,
        })
      );

      Alert.alert(
        "Task Completed",
        "File attached and status changed to completed."
      );
    }
  };

  const openFile = async () => {
    if (!task.file?.uri) {
      Alert.alert("No File", "No submitted file found");
      return;
    }

    try {
      await Linking.openURL(task.file.uri);
    } catch (error) {
      Alert.alert("Error", "Unable to open this file on your device");
    }
  };

  const removeTask = () => {
    dispatch(deleteTask(task.id));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📝</Text>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.subtitle}>{task.category}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{task.description}</Text>

        <Text style={styles.label}>Priority</Text>
        <Text style={styles.value}>{task.priority}</Text>

        <Text style={styles.label}>Due Date</Text>
        <Text style={styles.value}>{task.dueDate || task.date}</Text>

        <Text style={styles.label}>Status</Text>
        <Text
          style={[
            styles.status,
            { color: task.completed ? colors.success : colors.warning },
          ]}
        >
          {task.completed ? "Completed" : "Pending"}
        </Text>

        {task.submittedAt && (
          <>
            <Text style={styles.label}>Submitted On</Text>
            <Text style={styles.value}>{task.submittedAt}</Text>
          </>
        )}

        <Text style={styles.label}>Submitted File</Text>

        {task.file ? (
          <View style={styles.fileBox}>
            <Text style={styles.fileIcon}>📎</Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.fileName}>{task.file.name}</Text>
              <Text style={styles.fileText}>Completed work file attached</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noFile}>
            No file submitted yet. Submit completed work to attach a file.
          </Text>
        )}
      </View>

      {!task.completed && (
        <CustomButton
          title="Submit Completed Work"
          onPress={submitCompletedWork}
          type="success"
        />
      )}

      {task.file && (
        <CustomButton
          title="Open Submitted File"
          onPress={openFile}
          type="success"
        />
      )}

      <CustomButton title="Delete Task" onPress={removeTask} type="danger" />

      <CustomButton title="Back" onPress={() => navigation.goBack()} />
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

  notFound: {
    fontSize: 25,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 20,
  },

  header: {
    backgroundColor: colors.secondary,
    borderRadius: 28,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
    elevation: 6,
  },

  headerIcon: {
    fontSize: 55,
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
  },

  subtitle: {
    color: "#E0F2FE",
    marginTop: 6,
    fontWeight: "700",
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 22,
    elevation: 5,
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.muted,
    marginTop: 12,
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginTop: 5,
    lineHeight: 23,
  },

  status: {
    fontSize: 17,
    fontWeight: "900",
    marginTop: 5,
  },

  fileBox: {
    backgroundColor: "#EEF2FF",
    padding: 14,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  fileIcon: {
    fontSize: 30,
    marginRight: 12,
  },

  fileName: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
  },

  fileText: {
    color: colors.muted,
    marginTop: 3,
    fontWeight: "600",
  },

  noFile: {
    color: colors.muted,
    marginTop: 6,
    fontWeight: "700",
    lineHeight: 22,
  },
});