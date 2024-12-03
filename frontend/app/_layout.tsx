import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingScreen" options={{ title: 'Onboarding' }} />
      <Stack.Screen name="Home/Home" options={{ title: 'Home' }} />
      <Stack.Screen name="Components/EPDS/Questionnaire" options={{ title: 'EPDSQuestionnaire' }} />
      <Stack.Screen name="Components/GDS/Questionnaire" options={{ title: 'GDSQuestionnaire' }} />
      <Stack.Screen name="Components/DAS/Questionnaire" options={{ title: 'DASQuestionnaire'}} />
      
    </Stack>
  );
}
