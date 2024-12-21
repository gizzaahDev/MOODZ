import React, { useEffect, useState } from "react";
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
  Button,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useTheme } from "../ThemeContext";
import FontLoader from "../../FontLoader";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from "@expo/vector-icons/Ionicons";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const router = useRouter();
  const { theme } = useTheme();


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

  // Handle Sign-Up
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Phone validation regex for 10 digits or +94 with 9 digits
  const phoneRegex = /^(\+94\d{9}|\d{10})$/;

  // Password validation regex
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  // Handle Sign-Up
  const handleSignUp = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number.");
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      console.log("User created successfully:", user.uid);

      // Update user's display name and phone number in Firebase Authentication
      await user.updateProfile({
        displayName: fullName,
      });

      console.log("User profile updated:", { fullName, email, phone });

      console.log("Success", "User signed up successfully!");
      router.push("./Login");
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert("Error", "The email address in use by another account!");
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
                SignUp
              </Text>
            </View>

            <View style={styles.formContainer}>
              {step === 1 && (
                <>
                  <TextInput
                    style={[styles.input, { color: theme.textPrimary, backgroundColor: theme.input_background, borderColor: theme.border }]}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                  />

                  <TextInput
                    style={[styles.input, { color: theme.textPrimary, backgroundColor: theme.input_background, borderColor: theme.border }]}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor="#888"
                  />

                  <TextInput
                    style={[styles.input, { color: theme.textPrimary, backgroundColor: theme.input_background, borderColor: theme.border }]}
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#888"
                  />

                  <Text style={styles.guideTextContainer}>
                    <Text
                      style={[styles.normalText, { color: theme.dimText }]}
                    >
                      Click{" "}
                    </Text>

                    <Text style={[styles.linkText, { color: theme.title }]}>
                      Next,
                    </Text>
                    <Text
                      style={[styles.normalText, { color: theme.dimText }]}
                    >
                      {" "}to create password.
                    </Text>

                  </Text>

                  <TouchableOpacity
                    style={[styles.resetButton, { backgroundColor: theme.buttonBackground }]}
                    onPress={() => setStep(2)}
                  >
                    <Text
                      style={[styles.resetButtonText, { color: theme.buttonText }]}
                    >

                      Next{" "}
                      <AntDesign name="rightcircle" size={18} style={{ color: theme.buttonText }} />
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.linkTextContainer}>
                    <Text>
                      <Text
                        style={[styles.normalText, { color: theme.dimText }]}
                      >
                        Already have an account?{" "}
                      </Text>
                      <TouchableOpacity onPress={() => router.replace("./Login")}>
                        <Text style={[styles.linkText, { color: theme.title }]}>
                          Login
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </View>


                </>
              )}

              {step === 2 && (
                <>
                  <View style={styles.passwordContainer}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            color: theme.textPrimary,
                            backgroundColor: theme.input_background,
                            borderColor: theme.border,
                          },
                        ]}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                        placeholderTextColor="#888"
                      />
                      <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => setPasswordVisible(!isPasswordVisible)}
                      >
                        <Ionicons
                          name={isPasswordVisible ? "eye" : "eye-off"}
                          size={24}
                          style={{ color: theme.dimText }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            color: theme.textPrimary,
                            backgroundColor: theme.input_background,
                            borderColor: theme.border,
                          },
                        ]}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!isConfirmPasswordVisible}
                        placeholderTextColor="#888"
                      />
                      <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
                      >
                        <Ionicons
                          name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                          size={24}
                          style={{ color: theme.dimText }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.guideTextContainer}>
                    <Text
                      style={[styles.normalText, { color: theme.dimText }]}
                    >
                      By signing up, you 're agree to our{" "}
                    </Text>

                    <Text style={[styles.linkText, { color: theme.title }]}>
                      Terms & Conditions
                    </Text>
                    <Text
                      style={[styles.normalText, { color: theme.dimText }]}
                    >
                      {" "}and{" "}
                    </Text>
                    <Text style={[styles.linkText, { color: theme.title }]}>
                      Privacy Policy
                    </Text>

                  </Text>

                  <View style={styles.buttonSignUp}>
                    <TouchableOpacity
                      style={[styles.resetButton, { backgroundColor: theme.buttonBackground }]}
                      onPress={() => setStep(1)}
                    >

                      <Text
                        style={[styles.resetButtonText, { color: theme.buttonText }]}
                      ><AntDesign name="leftcircle" size={18} style={{ color: theme.buttonText }} />
                        {" "}Back
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.buttonSignUp}>
                    <TouchableOpacity
                      style={[styles.resetButton, {
                        borderColor: theme.border, // Border color from theme
                        borderWidth: 1,
                      }]}
                      onPress={handleSignUp}
                    >
                      <Text
                        style={[styles.resetButtonText, {}]}
                      >
                        SignUp
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.linkTextContainer}>
                    <Text>
                      <Text
                        style={[styles.normalText, { color: theme.dimText }]}
                      >
                        Already have an account?{" "}
                      </Text>
                      <TouchableOpacity onPress={() => router.replace("./Login")}>
                        <Text style={[styles.linkText, { color: theme.title }]}>
                          Login
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </View>


                </>
              )}
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
    marginTop: 30,
    paddingRight: 20,
  },
  titleText: {
    fontFamily: "poppins",
    fontSize: 32,
  },
  formContainer: {
    marginTop: 0,
    padding: 20,
  },

  resetButton: {
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: '#fff',
    // Border thickness
  }
  ,
  resetButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "poppins",
    color: 'red'
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
  linkTextContainer: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    textAlign: "center", // Center text inside the container
    marginTop: 25, // Add spacing from other elements
  },
  normalText: {
    fontSize: 19, // Adjust font size if needed
    textAlign: "center",
  },
  linkText: {
    fontWeight: "bold", // Bold styling for emphasis
    fontSize: 19, // Match the font size of normalText
    textAlign: "center",
  },
  guideTextContainer: {
    marginBottom: 10,
  },

  buttonSignUp: {
    marginBottom: 10
  },

  passwordContainer: {
    marginBottom: 15, // Space between password fields
  },
  inputContainer: {
    position: "relative", // Allows positioning the icon relative to the container

  },
  input: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 15,
    marginBottom: 10, // Space for the icon
    height: 50, // Adjust height as needed
  },

  iconContainer: {
    position: "absolute",
    top: "43%",
    left: '88%', // Distance from the right edge
    transform: [{ translateY: -12 }], // Adjust vertical centering based on the icon size
  },
});

export default SignUp;
