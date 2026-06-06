import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import { colors } from "../components/colors";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Data", "Please fill all fields");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    await AsyncStorage.setItem("USER_ACCOUNT", JSON.stringify(user));
    await AsyncStorage.setItem("CURRENT_USER", JSON.stringify(user));

    Alert.alert("Success", "Account created successfully");
    navigation.replace("MainTabs");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎓</Text>

      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.subtitle}>
        Start managing your academic tasks
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <CustomButton title="Create Account" onPress={signup} />

      <CustomButton
        title="Back to Login"
        onPress={() => navigation.goBack()}
        type="success"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  logo: {
    fontSize: 55,
    textAlign: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: colors.secondary,
    textAlign: "center",
  },

  subtitle: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 28,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },

  input: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    fontSize: 15,
  },
});