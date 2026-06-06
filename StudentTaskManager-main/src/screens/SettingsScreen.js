import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { clearAllTasks } from "../redux/taskSlice";
import { colors } from "../components/colors";

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem("DARK_MODE");
    if (savedTheme === "true") {
      setDarkMode(true);
    }
  };

  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    await AsyncStorage.setItem("DARK_MODE", JSON.stringify(newValue));
  };

  const clearTasks = () => {
    Alert.alert("Clear Tasks", "Are you sure you want to delete all tasks?", [
      { text: "Cancel" },
      {
        text: "Clear",
        onPress: () => {
          dispatch(clearAllTasks());
          Alert.alert("Done", "All tasks have been cleared");
        },
      },
    ]);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("CURRENT_USER");
    navigation.replace("Login");
  };

  const switchAccount = async () => {
    await AsyncStorage.removeItem("CURRENT_USER");
    navigation.replace("Login");
  };

  const bgColor = darkMode ? "#0F172A" : colors.background;
  const cardColor = darkMode ? "#1E293B" : colors.card;
  const textColor = darkMode ? "#FFFFFF" : colors.text;
  const mutedColor = darkMode ? "#CBD5E1" : colors.muted;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bgColor }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>⚙️</Text>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your app preferences</Text>
      </View>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Account
        </Text>

        <TouchableOpacity style={styles.row} onPress={switchAccount}>
          <Ionicons name="people-outline" size={24} color={colors.secondary} />
          <Text style={[styles.rowText, { color: textColor }]}>Switch Account</Text>
          <Ionicons name="chevron-forward" size={22} color={mutedColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color={colors.danger} />
          <Text style={[styles.rowText, { color: textColor }]}>Logout</Text>
          <Ionicons name="chevron-forward" size={22} color={mutedColor} />
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Preferences
        </Text>

        <View style={styles.row}>
          <Ionicons name="moon-outline" size={24} color={colors.primary} />
          <Text style={[styles.rowText, { color: textColor }]}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        <TouchableOpacity style={styles.row} onPress={clearTasks}>
          <Ionicons name="trash-outline" size={24} color={colors.danger} />
          <Text style={[styles.rowText, { color: textColor }]}>Clear All Tasks</Text>
          <Ionicons name="chevron-forward" size={22} color={mutedColor} />
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          App Information
        </Text>

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: mutedColor }]}>App Name</Text>
          <Text style={[styles.infoValue, { color: textColor }]}>
            Academic Task Manager
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: mutedColor }]}>Version</Text>
          <Text style={[styles.infoValue, { color: textColor }]}>1.0.0</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: mutedColor }]}>Storage</Text>
          <Text style={[styles.infoValue, { color: textColor }]}>
            AsyncStorage
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: mutedColor }]}>State</Text>
          <Text style={[styles.infoValue, { color: textColor }]}>
            Redux Toolkit
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },

  header: {
    backgroundColor: colors.primary,
    padding: 25,
    borderRadius: 28,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },

  icon: {
    fontSize: 55,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 8,
  },

  subtitle: {
    color: "#CCFBF1",
    marginTop: 6,
    fontWeight: "700",
  },

  card: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 18,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  rowText: {
    flex: 1,
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "800",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  infoLabel: {
    fontSize: 15,
    fontWeight: "700",
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "900",
  },

  backButton: {
    backgroundColor: colors.secondary,
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});