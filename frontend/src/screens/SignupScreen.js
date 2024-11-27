import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { signup } from "../services/api";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await signup(email, password);
      Alert.alert("Success", response.message);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}
