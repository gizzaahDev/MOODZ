import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';

interface CommercializationDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSelectPlan: (plan: string, price: number) => void;
}

const CommercializationDrawer: React.FC<CommercializationDrawerProps> = ({
  visible,
  onClose,
  onSelectPlan,
}) => {
  const router = useRouter(); // Use the router for navigation

  const plans = [
    { duration: '1 month', price: 1000, discount: '' },
    { duration: '6 months', price: 4800, discount: '6% off' },
    { duration: '12 months', price: 5200, discount: '9% off' },
  ];

  const handlePlanSelection = (plan: string, price: number) => {
    onSelectPlan(plan, price); // Call the parent's onSelectPlan function
    switch (plan) {
      case '1 month':
        router.push('/Components/EPDS/SubComponents/EPDSWelcome'); // Navigate to 1-month plan page
        break;
      case '6 months':
        router.push('/Components/EPDS/SubComponents/EPDSWelcome'); // Navigate to 6-month plan page
        break;
      case '12 months':
        router.push('/Components/EPDS/SubComponents/EPDSWelcome'); // Navigate to 12-month plan page
        break;
      default:
        router.push('/Components/EPDS/SubComponents/EPDSWelcome'); // Default navigation
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.drawerContainer}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Text style={styles.backButtonText}>← Previous</Text>
          </TouchableOpacity>

          {/* Header */}
          <Text style={styles.headerText}>
            To start personalized recommendations
          </Text>

          {/* Illustration Placeholder */}
          <View style={styles.illustrationPlaceholder}>
            <Text style={styles.illustrationText}>[Illustration Placeholder]</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Unlock Personalized Care with Premium!</Text>

          {/* Plans */}
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.duration}
                style={styles.planButton}
                onPress={() => handlePlanSelection(plan.duration, plan.price)}
              >
                <Text style={styles.planDuration}>{plan.duration}</Text>
                {plan.discount && (
                  <Text style={styles.planDiscount}>{plan.discount}</Text>
                )}
                <Text style={styles.planPrice}>₹{plan.price}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Trial Info */}
          <Text style={styles.trialText}>Includes 7 Days Free Trial</Text>

          {/* Get Premium Button */}
          <TouchableOpacity
            style={styles.getPremiumButton}
            onPress={() => handlePlanSelection(plans[0].duration, plans[0].price)} // Default to 1-month plan
          >
            <Text style={styles.getPremiumButtonText}>Get Premium</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  drawerContainer: {
    width: '100%',
    backgroundColor: '#F5FAFA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
    minHeight: '70%',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#024950',
    fontWeight: '600',
  },
  headerText: {
    fontSize: 18,
    color: '#01363B',
    textAlign: 'center',
    marginBottom: 20,
  },
  illustrationPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#E0F2F1',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  illustrationText: {
    fontSize: 14,
    color: '#024950',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#01363B',
    textAlign: 'center',
    marginBottom: 20,
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  planButton: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  planDuration: {
    fontSize: 16,
    color: '#01363B',
    fontWeight: '600',
  },
  planDiscount: {
    fontSize: 14,
    color: '#016A70',
    marginTop: 5,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#01363B',
    marginTop: 5,
  },
  trialText: {
    fontSize: 14,
    color: '#024950',
    textAlign: 'center',
    marginBottom: 20,
  },
  getPremiumButton: {
    width: '80%',
    maxWidth: 300,
    backgroundColor: '#016A70',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  getPremiumButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E0F2F1',
  },
});

export default CommercializationDrawer;