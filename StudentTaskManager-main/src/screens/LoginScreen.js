import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import { colors } from "../components/colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      Alert.alert("Login Error", "Please enter email and password");
      return;
    }

    const savedUser = await AsyncStorage.getItem("USER_ACCOUNT");

    if (!savedUser) {
      Alert.alert("Account Not Found", "Please create an account first");
      return;
    }

    const user = JSON.parse(savedUser);

    if (email === user.email && password === user.password) {
      await AsyncStorage.setItem("CURRENT_USER", JSON.stringify(user));
      navigation.replace("MainTabs");
    } else {
      Alert.alert("Invalid Login", "Email or password is incorrect");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topShape} />

      <View style={styles.card}>
        <Text style={styles.icon}>🎓</Text>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Login and manage your academic tasks
        </Text>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={22} color={colors.primary} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={22} color={colors.primary} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <CustomButton title="Sign In" onPress={login} />

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signup}>
            New student? <Text style={styles.link}>Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 24,
  },
  topShape: {
    position: "absolute",
    top: -90,
    right: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#CCFBF1",
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 30,
    padding: 24,
    elevation: 7,
  },
  icon: {
    fontSize: 65,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
    fontWeight: "600",
  },
  label: {
    fontWeight: "900",
    color: colors.text,
    marginBottom: 7,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 15,
  },
  signup: {
    textAlign: "center",
    color: colors.muted,
    marginTop: 16,
    fontWeight: "700",
  },
  link: {
    color: colors.secondary,
    fontWeight: "900",
  },
});