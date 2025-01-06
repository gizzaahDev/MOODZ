import { Stack } from 'expo-router';
import { StatusBar, BackHandler } from "react-native";
import { ThemeProvider, useTheme } from './ThemeContext';
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'expo-router';

const ThemedStatusBar = () => {
  const { theme } = useTheme() as { theme: any };

  return (
    <StatusBar
      barStyle={theme.mode === "dark" ? "light-content" : "dark-content"} // Adjust text/icon color
      backgroundColor={theme.background} // Adjust background color
    />
  );
};

export default function RootLayout() {
  const router = useRouter(); // For navigation
  const pathname = usePathname(); // Get current page route name

  // Handle hardware back button
  useEffect(() => {
    const handleBackPress = () => {
      if (pathname === '/Auth/SignUp') { // If currently on the Signup page
        router.replace('/Auth/Login'); // Replace with Login page
        return true; // Prevent default behavior
      } else if (router.canGoBack()) { // For other pages, go back normally
        router.back(); // Navigate back
        return true;
      } else {
        BackHandler.exitApp(); // Exit app if no previous page
        return true;
      }
    };

    // Add back button listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove(); // Cleanup listener
  }, [pathname, router]); // Depend on pathname and router changes

  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true, // Enable swipe gestures for smooth transitions
          animation: 'slide_from_right', // Default animation for forward navigation
        }}
      >
        {/* Screens */}
        <Stack.Screen name="Gettingstart/GettingstartScreen" options={{ title: 'Gettingstart' }} />
        <Stack.Screen name="Home/Home" options={{ title: 'Home' }} />
        <Stack.Screen name="Components/EPDS/Questionnaire" options={{ title: 'EPDSQuestionnaire' }}/>
        <Stack.Screen name="Components/GDS/Questionnaire" options={{ title: 'GDSQuestionnaire' }}/>
        <Stack.Screen name="Components/DAS/Questionnaire" options={{ title: 'DASQuestionnaire' }}
        />
        <Stack.Screen name="Auth/Login" options={{ title: 'LoginPage',animation: 'slide_from_left', }}/>
        <Stack.Screen name="Auth/SignUp" options={{  title: 'SignUpPage',  animation: 'slide_from_right', }} />
        <Stack.Screen  name="Auth/ForgotPassword" options={{ title: 'ForgotPasswordPage' }}/>
        <Stack.Screen  name="OnboardingScreen/Onboarding" options={{ title: 'OnboardingPage' }} />
        <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />
        {/* <Stack.Screen name="Components/EPDS/SubComponents/ResultsSheet" options={{ title: 'ResultsSheet' }}/> */}
      </Stack>
      


    </ThemeProvider>
  );
}
