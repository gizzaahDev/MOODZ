import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
  ToastAndroid
} from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useTheme } from "../ThemeContext";
import FontLoader from "../../FontLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

GoogleSignin.configure({
  webClientId:
    "414852162412-rf4mu49gbeu6858inh8e5m4fdeich57q.apps.googleusercontent.com",
  scopes: ["profile", "email"],
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  


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

  // Regular expressions for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


  const validateInputs = () => {
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long."
      );
      return false;
    }
    return true;
  };

  const handleSignIn = () => {
    if (!validateInputs()) return;

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Save login state and user details in AsyncStorage
        await AsyncStorage.setItem("userLoggedIn", "true");
        await AsyncStorage.setItem("userEmail", user.email);
        await AsyncStorage.setItem("userName", user.displayName || "User");

        console.log("Signed In");
        router.push("/Home/Home");
      })
      .catch((err) => {
        console.error("Error signing in:", err);
        Alert.alert("Invalid Credentials", "The email or password is incorrect.");
      });
  };


  const handleSignup = () => {
    router.replace("./SignUp");
  };

  const handleForgotPassword = () => {
    router.replace("./ForgotPassword");
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const googleSignInResult = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(
        googleSignInResult.data?.idToken
      );

      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;

      // Save login details to AsyncStorage
      await AsyncStorage.setItem("userLoggedIn", "true");
      await AsyncStorage.setItem("userEmail", user.email);
      await AsyncStorage.setItem("userName", user.displayName || "User");

      await auth().signInWithCredential(googleCredential);
      await AsyncStorage.setItem("userLoggedIn", "true"); // Save login state
      ToastAndroid.show(
        "Login Successful! Redirecting to Home...",
        ToastAndroid.SHORT // or ToastAndroid.LONG for a longer display
      );
      // Route to Home screen
      router.push("/Home/Home"); // Ensure this path is correct for your setup
    } catch (error) {
      console.error("Error signing in with Google:", error);

      // Show error toast
      ToastAndroid.show(
        "Login Failed! Please try again.",
        ToastAndroid.SHORT
      );
    }
  }



  return (
    <FontLoader>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.container, { backgroundColor: theme.background }]}>
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

            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, { color: theme.textPrimary }]}>Login</Text>
            </View>

            {/* Login Content */}
            <View style={styles.loginContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.textPrimary,
                    backgroundColor: theme.input_background,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#888"
              />
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
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={[styles.forgetText, { color: theme.title }]}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.startButton, { backgroundColor: theme.buttonBackground }]}
                onPress={handleSignIn}
              >
                <Text style={[styles.startButtonText, { color: theme.buttonText }]}>Login</Text>
              </TouchableOpacity>

              <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={[styles.text, { color: theme.textPrimary }]}>OR</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity
                style={[
                  styles.googleStartButton,
                  {
                    backgroundColor: theme.googleSignButtonText,
                    borderColor: theme.border,
                    borderWidth: 1,
                  },
                ]}
                onPress={onGoogleButtonPress}
              >
                <View style={styles.contentContainer}>
                  <Image
                    source={require("../../assets/images/icons8-google-480.png")}
                    style={styles.buttonImage}
                  />
                  <Text
                    style={[styles.googleStartButtonText, { color: theme.googleStartButtonText }]}
                  >
                    Login with Google
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.linkTextContainer}>
                <Text>
                  <Text style={[styles.normalText, { color: theme.dimText }]}>
                    Don't have an account?{" "}
                  </Text>
                  <TouchableOpacity onPress={handleSignup}>
                    <Text style={[styles.linkText, { color: theme.title }]}>Sign Up</Text>
                  </TouchableOpacity>
                </Text>
              </View>
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
    height: "40%", // Reduced height to remove extra space
  },
  loginBgImage: {
    width: "100%",
    height: "100%", // Ensures full height usage
    resizeMode: "cover",
  },
  imageWrapper: {
    position: "absolute",
    top: 250, // Adjusted to match the reduced imageContainer height
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
  titleContainer: {
    paddingLeft: 20,
    marginTop: 20,
    paddingRight: 20,
  },
  titleText: {
    fontFamily: "poppins",
    fontSize: 32,
  },
  loginContainer: {
    flex: 1,
    padding: 20,
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


  forgetText: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 12,
  },
  startButton: {
    borderRadius: 250,
    paddingVertical: 15,
    paddingHorizontal: 60,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "poppins",
    textAlign: "center",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonImage: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  googleStartButton: {
    borderRadius: 250,
    paddingVertical: 10,
    paddingHorizontal: 60,
    alignItems: "center",
  },
  googleStartButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "poppins",
    textAlign: "center",

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
});

export default Login;
