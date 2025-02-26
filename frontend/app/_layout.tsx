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
      if (pathname.startsWith('/Components/EPDS/SubComponents/ActivityPages/')) {
        router.replace('/Components/EPDS/SubComponents/EPDSMyActivity'); // Send back to EPDSMyActivity
        return true;
      } 
      else if (pathname === '/Auth/SignUp') {
        router.replace('/Auth/Login'); 
        return true;
      } 
      else if (router.canGoBack()) {
        router.back();
        return true;
      } 
      else {
        BackHandler.exitApp();
        return true;
      }
    };
  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [pathname, router]);

  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true, // Enable swipe gestures
          animation: 'flip', // Default forward animation
          animationDuration: 300, // Smooth transition speed
        }}
      >
        {/* Screens */}
        <Stack.Screen name="Gettingstart/GettingstartScreen" options={{ title: 'Gettingstart' }} />
        <Stack.Screen name="Home/Home" options={{ title: 'Home', }} />
        <Stack.Screen name="Components/EPDS/Questionnaire" options={{ title: 'EPDSQuestionnaire', }}/>
        <Stack.Screen name="Components/GDS/Questionnaire" options={{ title: 'GDSQuestionnaire' }}/>
        <Stack.Screen name="Components/DAS/Questionnaire" options={{ title: 'DASQuestionnaire' }}/>

        <Stack.Screen name="Components/EPDS/SubComponents/EPDSWelcome" options={{ title: 'EPDSWelcome' }}/>
        <Stack.Screen name="Components/EPDS/SubComponents/ChooseActivities" options={{ title: 'ChooseActivities' }}/>
        <Stack.Screen name="Components/EPDS/SubComponents/EPDSMyActivity" options={{ title: 'EPDSMyActivity' }}/>

        <Stack.Screen name="Components/GDS/About" options={{ title: 'GDSAbout' }}/>
        <Stack.Screen name="Components/GDS/GDSHome" options={{ title: 'GDSHome' }}/>
        <Stack.Screen name="Components/GDS/GDSDay1" options={{ title: 'GDSDay1' }}/>
        <Stack.Screen name="Components/GDS/Music1" options={{ title: 'Music1' }}/>
        <Stack.Screen name="Components/GDS/PositiveT" options={{ title: 'PositiveT' }}/>


        
        <Stack.Screen name="Auth/Login" options={{ title: 'LoginPage',animation: 'slide_from_left', }}/>
        <Stack.Screen name="Auth/SignUp" options={{  title: 'SignUpPage',  animation: 'slide_from_right', }} />
        <Stack.Screen  name="Auth/ForgotPassword" options={{ title: 'ForgotPasswordPage' }}/>
        <Stack.Screen  name="OnboardingScreen/Onboarding" options={{ title: 'OnboardingPage' }} />
        <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />
        {/* <Stack.Screen name="Components/EPDS/SubComponents/ResultsSheet" options={{ title: 'ResultsSheet' }}/> */}
      
      



        {/* EPDS Activities */}
        <Stack.Screen name="Components/EPDS/SubComponents/ActivityPages/Activity01/Id01" options={{title: 'Id01', }}/>
        <Stack.Screen name="Components/EPDS/SubComponents/ActivityPages/Activity01/Meditaion" options={{title: 'Meditaion', }}/>
        <Stack.Screen name="Components/EPDS/SubComponents/ActivityPages/Activity02/Id02" options={{title: 'Id02',}}/>
        <Stack.Screen name="Components/EPDS/SubComponents/ActivityPages/Activity02/BreathingEx" options={{title: 'BreathingEx', }}/>
        <Stack.Screen name="Components/EPDS/SubComponents/ActivityPages/Activity03/Id03" options={{title: 'Id03',}}/>
        <Stack.Screen name="Components/EPDS/SubComponents/ActivityPages/Activity03/ProgressiveMuscleEX" options={{title: 'ProgressiveMuscleEX', }}/>










        <Stack.Screen name="Components/EPDS/SubComponents/ActivityPages/Activity11/Id11" options={{title: 'Id11',}}/>
        <Stack.Screen name="Components/EPDS/SubComponents/ActivityPages/Activity11/PositiveThought" options={{title: 'PositiveThought', }}/>
        
      </Stack>
    </ThemeProvider>
  );
}
