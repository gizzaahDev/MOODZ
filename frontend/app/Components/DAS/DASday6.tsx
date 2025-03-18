import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const { width, height } = Dimensions.get('window');

const DASday6 = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();

  const handleMedi = () => {
    router.replace('/Components/DAS/DASMeditation');
  };

  const handleBack = () => {
    router.replace('/Components/DAS/DASHome'); 
  };

  return (
    <FontLoader>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.textWelcome, { color: theme.textPrimary }]}>
              Heal your Mind
            </Text>
            <Text style={[styles.textTitle, { color: theme.title }]}>
              MEDITATION
            </Text>
            <Text style={[styles.textParagraph, { color: theme.textSecondary }]}>
              Try our Best MEDITATION Techniques
            </Text>
            <Text style={[styles.textParagraph, { color: theme.textSecondary }]}>
              Enhance your COMPASSION, WELLNESS & CONNECTION
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: theme.buttonBackground }]}
            onPress={handleMedi}
          >
            <Text style={[styles.startButtonText, { color: theme.buttonText }]}>
              Start
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/icon.png')}
            style={[styles.image, theme.imageStyle]}
            resizeMode="contain"
          />
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.buttonBackground }]}
          onPress={handleBack}
        >
          <Text style={[styles.backButtonText, { color: theme.buttonText }]}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  textWelcome: {
    fontFamily: 'asul',
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  textTitle: {
    fontFamily: 'poppins',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  textParagraph: {
    fontFamily: 'times',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  startButton: {
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 60,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'times',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.4, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  backButton: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: 'center', 
    marginBottom: 20, 
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'times',
  },
});

export default DASday6;