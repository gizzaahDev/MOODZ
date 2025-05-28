import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PremiumPlan6Months = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>6 Months Premium Plan</Text>
      <Text style={styles.description}>Enjoy exclusive features for 6 months!</Text>
      {/* Add payment or premium feature details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3FAF4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#016A70',
  },
  description: {
    fontSize: 16,
    color: '#024950',
    textAlign: 'center',
  },
});

export default PremiumPlan6Months; 