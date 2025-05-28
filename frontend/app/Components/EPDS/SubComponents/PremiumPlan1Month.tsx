import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PremiumPlan1Month = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>1 Month Premium Plan</Text>
      <Text style={styles.description}>Enjoy exclusive features for 1 month!</Text>
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

export default PremiumPlan1Month; 