/*import React from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity,ScrollView,Alert } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';


const GDSHome = ({ navigation }: { navigation: any }) => {
  
  const { theme } = useTheme() as { theme: any };
   const router = useRouter();

  return (
    <FontLoader>
    <View style={[styles.startcontainer, { backgroundColor: theme.background }]}>
    <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            PLAN
          </Text>

          <View style={styles.imgcontainer}>
          <Image
            source={require('../../../assets/images/GDSHome.png')}
            style={[styles.startImage, theme.imageStyle]} // Apply imageStyle from theme
          />
        </View>
        <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            Oooo
          </Text>
      </View>

      <ScrollView style={styles.scrollView1}>
      <View style={styles.buttonContainerraw}>
 
<View style={styles.buttonWrapper}>
    <Text style={styles.buttonText1}>Day{'\n'}1</Text>
  </View>

  <View style={styles.buttonWrapper}>
    <Text style={styles.buttonText1}>Day{'\n'}2</Text>
  </View>
  </View>

  <View style={styles.buttonContainerraw}>

<View style={styles.buttonWrapper}>
    <Text style={styles.buttonText1}>Day{'\n'}3</Text>
  </View>

  <View style={styles.buttonWrapper}>
    <Text style={styles.buttonText1}>Day{'\n'}4</Text>
  </View>
  </View>

  <View style={styles.buttonContainerraw}>

<View style={styles.buttonWrapper}>
    <Text style={styles.buttonText1}>Day{'\n'}5</Text>
  </View>

  <View style={styles.buttonWrapper}>
    <Text style={styles.buttonText1}>Day{'\n'}6</Text>
  </View>
  </View>

  <View style={styles.buttonContainerraw}>

<View style={styles.buttonWrapper}>
    <Text style={styles.buttonText1}>Day{'\n'}7</Text>
  </View>

  <View style={styles.buttonWrapper}>
    <Text style={styles.buttonText1}>Day{'\n'}8</Text>
  </View>
  </View>

  <View style={styles.buttonContainerraw}>

<View style={styles.buttonWrapper}>
    <Text style={styles.buttonText1}>Day{'\n'}9</Text>
  </View>

  <View style={styles.buttonWrapper}>
    <Text style={styles.buttonText1}>Day{'\n'}10</Text>
  </View>
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
    height:200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    overflow: "hidden", // Ensures rounded corners if used
    borderRadius: 10
  },
  startImage: {
    width: "150%",
    height: "120%",
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
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText1: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  scrollView1: {
    marginTop: 0,
  },
  buttonContainer1: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonContainerraw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonWrapper: {
    borderRadius:10,
    width:160,
    height:100,
    marginLeft:"5%",
    marginRight:"5%",
    alignItems: 'center', // Center the button and text
    backgroundColor:'#016A70',
    marginBottom:10
  },

});

export default GDSHome;
*/




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

            <TouchableOpacity onPress={handleAboutPress}>
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
