import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.jpg')} style={styles.logo} />
        <Image source={require('../../assets/images/user_icon.png')} style={styles.userIcon} />
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.subText}>How can I help you today?</Text>

      {/* Horizontal Buttons with labels outside */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="baby" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Child{'\n'}depression</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}>
          <Entypo name="slideshare" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Marital{'\n'}Depression</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/Components/EPDS/Questionnaire')} >
          <MaterialCommunityIcons name="mother-nurse" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Postpartum{'\n'}depression</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/Components/GDS/Questionnaire')}>
          <MaterialIcons name="elderly" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonText} >Elder{'\n'}depression</Text>
        </View>
      </View>

      {/* ScrollView with paragraphs */}
      <ScrollView style={styles.scrollView}>
        <Text style={styles.Heading}>News</Text>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphTitle}>Lorem Ipsum</Text>
          <Text style={styles.paragraphDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget eros ut mi malesuada
            venenatis. Nullam non enim ut dui pretium pretium. Integer nec risus ac mi varius efficitur.
          </Text>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphTitle}>Lorem Ipsum</Text>
          <Text style={styles.paragraphDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget eros ut mi malesuada
            venenatis. Nullam non enim ut dui pretium pretium. Integer nec risus ac mi varius efficitur.
          </Text>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphTitle}>Lorem Ipsum</Text>
          <Text style={styles.paragraphDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget eros ut mi malesuada
            venenatis. Nullam non enim ut dui pretium pretium. Integer nec risus ac mi varius efficitur.
          </Text>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphTitle}>Lorem Ipsum</Text>
          <Text style={styles.paragraphDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget eros ut mi malesuada
            venenatis. Nullam non enim ut dui pretium pretium. Integer nec risus ac mi varius efficitur.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius:50,
  },
  userIcon: {
    width: 40,
    height: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  Heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonWrapper: {
    alignItems: 'center', // Center the button and text
  },
  button: {
    backgroundColor: '#016A70',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center', // Center the icon inside the button
    height: 70, // Adjust button height
    width:70,
  },
  buttonText: {
    color: '#555',
    fontWeight: 'bold',
    marginTop: 5, // Space between the button and text
    textAlign: 'center',
  },
  scrollView: {
    marginTop: 20,
  },
  paragraphContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  paragraphTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraphDescription: {
    fontSize: 16,
    color: '#333',
  },
});
