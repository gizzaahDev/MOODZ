import React from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';


const GDSComplete = ({ navigation }: { navigation: any }) => {
  
  const { theme } = useTheme() as { theme: any };
   const router = useRouter();

   const handleLogin = () => {
    router.replace('/Components/GDS/GDSHome')
  };
   

  return (
    <FontLoader>
    <View style={[styles.startcontainer, { backgroundColor: theme.background }]}>
    <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
          Congratulations!
          </Text>
          <Text style={[styles.text_title, { color: theme.title }]}>
          You’ve Completed the Plan
          </Text>
          <Text style={[styles.text_paragrapgh, { color: theme.textSecondary }]}>
          We hope this journey has helped in your mental wellness. You can always restart or explore more self-care activities.</Text>

          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: theme.buttonBackground }]}  onPress={handleLogin}
          >
            <Text style={[styles.startButtonText, { color: theme.buttonText }]}>
              FINISHED
            </Text>
          </TouchableOpacity>
      </View>
      <View style={styles.imgcontainer}>
          <Image
            source={require('../../../assets/images/AboutGDS.png')}
            style={[styles.startImage, theme.imageStyle]} // Apply imageStyle from theme
          />
        </View>
    </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  startcontainer: {
    flex: 1,
  },
  textcontainer: {
    marginTop: 70,
    padding: 16,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgcontainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startImage: {
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text_welcome: {
    fontFamily: 'asul',
    fontSize: 30,
    marginBottom: 30,
  },
  text_title: {
    fontFamily: 'poppins',
    fontSize: 36,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text_paragrapgh: {
    fontFamily: 'times',
    fontSize: 17,
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 25,
  },
  startButton: {
    borderRadius: 250,
    paddingVertical: 15,
    paddingHorizontal: 60,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'times',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default GDSComplete;
