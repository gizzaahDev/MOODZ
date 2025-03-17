import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const mealPlan = {
  day: "Healthy Meal Plan - Day 1",
  meals: [
    "🥣🍌 Breakfast: Oatmeal with fruits, nuts, and honey\n\n🍎 * Provides fiber for digestion\n\n🥜 * Rich in antioxidants for brain health\n\n🍯 * Natural sweetener that supports immunity",
    "🍗🥦 Lunch: Grilled salmon with steamed vegetables, quinoa, and avocado\n\n🐟 * Omega-3 fatty acids for heart and brain function\n\n🥑 * Avocado provides healthy fats for improved mood\n\n🥕 * Carrots and greens boost immunity and digestion",
    "🥗🍞 Dinner: Lentil soup with whole grain bread, mixed greens, and yogurt\n\n🥬 * High in protein and iron for energy\n\n🍞 * Whole grains aid digestion and reduce inflammation\n\n🥛 * Yogurt supports gut health and reduces stress",
    "💧🥤 Water Intake: 2.5L of water, herbal tea, and fresh juice\n\n💦 * Helps maintain hydration and cognitive function\n\n🍵 * Herbal tea calms nerves and promotes relaxation\n\n🍊 * Fresh juice provides vitamins to boost energy"
  ],
  benefits: [
    "🍓 Oatmeal, nuts, and honey provide long-lasting energy and keep blood sugar levels stable.",
    "🐟 Salmon, avocado, and greens contain essential nutrients that enhance memory and reduce stress.",
    "🥬 Lentils, yogurt, and whole grains support gut health, which is linked to better mental well-being.",
    "💧 Proper hydration with water, tea, and juice flushes toxins, improves skin, and keeps joints healthy."
  ]
};

const MealPlan = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (mealPlan.meals.length + mealPlan.benefits.length));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGDSHomePress = async () => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;
    
    try {
      const userRef = firestore().collection('UsersGDS').doc(userId);
      const userDoc = await userRef.get();
      const data = userDoc.data() || { points: 0 };
      
      await userRef.set(
        {
          points: (data.points || 0) + 1, // Increment points
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating points:", error);
    }

    router.replace("/Components/GDS/Day2/GDSDay3");
  };

  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}> 
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>MEAL PLAN</Text>
          <View style={styles.imgcontainerday1}>
            <Text style={styles.mealText}>{index < mealPlan.meals.length ? mealPlan.meals[index] : mealPlan.benefits[index - mealPlan.meals.length]}</Text>
          </View>
        </View>

        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleGDSHomePress}>
            <Text style={styles.backButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  startcontainer: { flex: 1 },
  textcontainer: { marginTop: 70, padding: 16, alignItems: 'center' },
  text_welcome: { fontFamily: 'roboto', fontSize: 30, marginBottom: 20 },
  mealText: { fontSize: 30, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  imgcontainerday1: {
    width: 375,
    height: 575,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    borderColor: "#016A70",
    borderWidth: 2,
    backgroundColor: '#E8F6EF',
  },
  buttonContainer: { alignItems: 'center', marginVertical: 10 },
  buttonText1: { color: 'white', fontSize: 25, fontWeight: 'bold' },
  backButtonContainer: { alignItems: 'center', marginTop: 20 },
  backButton: {
    borderRadius: 40,
    width: 140,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#016A70',
    borderWidth: 1,
    borderColor: '#016A70',
  },
  backButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
});

export default MealPlan;