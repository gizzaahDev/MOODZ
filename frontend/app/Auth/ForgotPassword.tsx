import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ToastAndroid,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useTheme } from "../ThemeContext";
import FontLoader from "../../FontLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  // Handle keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleResetPassword = async () => {
    if (!email) {
      ToastAndroid.show(
        "Please enter a valid email address.",
        ToastAndroid.SHORT // or ToastAndroid.LONG for a longer display
      );
      
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      ToastAndroid.show(
        "Password reset email has been sent. Please check your inbox.",
        ToastAndroid.LONG // or ToastAndroid.LONG for a longer display
      );
      router.replace("./Login"); // Redirect back to Login after success
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      
      ToastAndroid.show(
        "Unable to send reset email.",
        ToastAndroid.LONG // or ToastAndroid.LONG for a longer display
      );
    }
  };

  return (
    <FontLoader>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Image Container */}
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/loginbg.png")}
                style={[styles.loginBgImage, theme.imageStyle]}
              />
              {!isKeyboardVisible && (
                <View
                  style={[
                    styles.imageWrapper,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <Image
                    source={require("../../assets/images/logo.jpg")}
                    style={[styles.overlayImage, theme.imageStyle]}
                  />
                </View>
              )}
            </View>

            <View style={styles.header}>
              <Text style={[styles.titleText, { color: theme.textPrimary }]}>
                Reset Password
              </Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={[styles.input, { color: theme.textPrimary, backgroundColor: theme.input_background, borderColor: theme.border }]}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={[styles.resetButton, { backgroundColor: theme.buttonBackground }]}
                onPress={handleResetPassword}
              >
                <Text
                  style={[styles.resetButtonText, { color: theme.buttonText }]}
                >
                  Send Reset Email
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => router.replace("./Login")}
              >
                <Text
                  style={[styles.backToLoginText, { color: theme.title }]}
                >
                  Back to Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, // Ensures the ScrollView takes full height
  },
  imageContainer: {
    width: "100%",
    height: "40%",
  },
  loginBgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageWrapper: {
    position: "absolute",
    top: 250,
    right: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  header: {
    paddingLeft: 20,
    marginTop: 20,
    paddingRight: 20,
  },
  titleText: {
    fontFamily: "poppins",
    fontSize: 32,
  },
  formContainer: {
    marginTop: 40,
    padding: 20,
  },
  input: {
    borderWidth: 1,

    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
  },
  resetButton: {
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  backToLoginText: {
    fontSize: 18,
    textDecorationLine: "underline",
    fontFamily: "poppins",
  },
});

export default ForgotPassword;
