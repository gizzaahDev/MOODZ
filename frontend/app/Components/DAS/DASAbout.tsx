import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const { width, height } = Dimensions.get('window');

const DASAbout = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/Components/DAS/DASAbout2');
  };

  return (
    <FontLoader>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.textWelcome, { color: theme.textPrimary }]}>
              STEP 1
            </Text>
            <Text style={[styles.textTitle, { color: theme.title }]}>
            Start your 7 Day Plan
            </Text>
            <Text style={[styles.textParagraph, { color: theme.textSecondary }]}>
              Cultivate a Peacefull and Balanced state of MIND
            </Text>
            <Text style={[styles.textParagraph, { color: theme.textSecondary }]}>
              Complete Daily Tasks to find Calm and BALANCE
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: theme.buttonBackground }]}
            onPress={handleLogin}
          >
            <Text style={[styles.startButtonText, { color: theme.buttonText }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/AboutGDS.png')}
            style={[styles.image, theme.imageStyle]}
            resizeMode="contain"
          />
        </View>
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
    elevation: 3, // Add shadow for better depth
    shadowColor: '#000', // Shadow for iOS
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
    height: height * 0.4, // Adjust image height dynamically
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default DASAbout;
