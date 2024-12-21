import { Stack } from 'expo-router';
import { StatusBar } from "react-native";
import { ThemeProvider, useTheme } from './ThemeContext';
import React from 'react';

const ThemedStatusBar = () => {
  const { theme } = useTheme(); // Access the current theme from ThemeContext

  return (
    <StatusBar
      barStyle={theme.mode === "dark" ? "light-content" : "dark-content"} // Adjust text/icon color
      backgroundColor={theme.background} // Adjust background color
    />
  );
};

export default function RootLayout() {
  return (

    <ThemeProvider>
      <ThemedStatusBar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GettingstartScreen" options={{ title: 'Gettingstart' }} />
        <Stack.Screen name="Home/Home" options={{ title: 'Home' }} />
        <Stack.Screen name="Components/EPDS/Questionnaire" options={{ title: 'EPDSQuestionnaire' }} />
        <Stack.Screen name="Components/GDS/Questionnaire" options={{ title: 'GDSQuestionnaire' }} />
        <Stack.Screen name="Components/DAS/Questionnaire" options={{ title: 'DASQuestionnaire' }} />
        <Stack.Screen name="Auth/Login" options={{ title: 'LoginPage' }} />
        <Stack.Screen name="Auth/SignUp" options={{ title: 'SignUpPage' }} />
        <Stack.Screen name="Auth/ForgotPassword" options={{ title: 'ForgotPasswordPage' }} />
        <Stack.Screen name="OnboardingScreen/Onboarding" options={{ title: 'OnboardingPage' }} />
        <Stack.Screen name='(tabs)' options={{headerShown:false}}/>


      </Stack>
    </ThemeProvider>
  );
}

