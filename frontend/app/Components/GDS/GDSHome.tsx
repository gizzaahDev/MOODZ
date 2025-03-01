
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const GDSHome = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();

  const images = [
    require('../../../assets/images/GDSHome2.jpg'),
    require('../../../assets/images/GDSHome3.jpg'),
    require('../../../assets/images/GDSHome4.jpg'),

  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAboutPress = () => {

    router.replace("/Components/GDS/GDSDay1");
    // Navigate to About
  };

  const handleAboutPressDay2 = () => {

    router.replace("/Components/GDS/Day2/GDSDay2");
    // Navigate to About
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [images.length]);

  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}>
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            PLAN
          </Text>

          <View style={styles.imgcontainer}>
            <Image
              source={images[currentImageIndex]}
              style={[styles.startImage, theme.imageStyle]} // Apply imageStyle from theme
            />
          </View>

          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            oooo
          </Text>
        </View>

        <ScrollView style={styles.scrollView1}>

          <View style={styles.buttonContainerraw}>
            <TouchableOpacity onPress={handleAboutPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Day{'\n'}  1</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAboutPressDay2}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Day{'\n'}  2</Text>
            </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainerraw}>
          <TouchableOpacity onPress={handleAboutPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Day{'\n'}  3</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAboutPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Day{'\n'}  4</Text>
            </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainerraw}>
          <TouchableOpacity onPress={handleAboutPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Day{'\n'}  5</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAboutPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Day{'\n'}  6</Text>
            </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainerraw}>
          <TouchableOpacity onPress={handleAboutPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Day{'\n'}  7</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAboutPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Day{'\n'}  8</Text>
            </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainerraw}>
          <TouchableOpacity onPress={handleAboutPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Day{'\n'}  9</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAboutPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Day{'\n'} 10</Text>
            </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    width: 350,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden', // Ensures rounded corners if used
    borderRadius: 10,
    borderColor: "#016A70",
    borderWidth: 0.9,
  },
  startImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text_welcome: {
    fontFamily: 'asul',
    fontSize: 30,
    marginBottom: 20,
  },
  scrollView1: {
    marginTop: 0,
  },
  buttonContainerraw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonWrapper: {
    borderRadius: 10,
    width: 160,
    height: 100,
    marginLeft: '8%',
    marginRight: '5%',
    alignItems: 'center', // Center the button and text
    backgroundColor: '#016A70',
    marginBottom: 10,
  },
  buttonText1: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',

  },
});

export default GDSHome;
