import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingScreen" options={{ title: 'Onboarding' }} />
      <Stack.Screen name="Home/Home" options={{ title: 'Home' }} />
      <Stack.Screen name="Components/EPDS/Questioner" options={{ title: 'EPDSQuestioner' }} />
      <Stack.Screen name="Components/GDS/Questioner" options={{ title: 'GDSQuestioner' }} />
      
    </Stack>
  );
}
