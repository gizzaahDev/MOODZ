import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { useTheme } from "../ThemeContext";
import LottieView from 'lottie-react-native';
import Article1 from '../Articles/EPDSArticle1';


export default function Home() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("User");
  const { theme } = useTheme() as { theme: any };
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handlePress = (category: string, route: string) => {
    setSelectedCategory(category); 
    setLoading(true); 
    
    
    setTimeout(() => {
      router.push(route as any); 
      setLoading(false); 
    }, 1500); 
  };

  
  const handleBackPress = () => {
    if (loading) {
      
      setLoading(false); 
      setSelectedCategory(null); 
      return true; 
    }
    return false; 
  };

  
  useEffect(() => {
    
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [loading]); 

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const photoURL = await AsyncStorage.getItem("userPhotoURL");
        const name = await AsyncStorage.getItem("userName");

        setProfileImage(photoURL || null);
        setUserName(name || "User");
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../assets/images/userpic.png")
            }
            style={styles.profileImage}
          />
          <View style={styles.userText}>
            <Text style={[styles.greeting, { color: theme.textPrimary, flexWrap: 'wrap', maxWidth: 250 }]}>
              Hello, <Text style={[styles.userName, { color: theme.title, }]}>{userName}</Text>
            </Text>
            <Text style={styles.subtitle}>How can I help you today?</Text>
          </View>
        </View>

        {/* Notification Bell */}
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name="bell" size={28} style={{ color: theme.iconColor }} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </View>
      </View>

      {/* Depression Categories */}
      <View style={styles.categoryContainer}>
      {/* Child Depression */}
      <TouchableOpacity
        style={[styles.categoryBox, { backgroundColor: '#E6E6FA' }]}
        onPress={() => handlePress('child', '/Components/ChildDepression/Questionnaire')}
      >
        {loading && selectedCategory === 'child' ? (
          <LottieView
            source={require('../../assets/lottie/LoadingElepGre.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        ) : (
          <>
            <Image source={require('../../assets/images/child.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Child{"\n"}Depression</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Marital Depression */}
      <TouchableOpacity
        style={[styles.categoryBox, { backgroundColor: '#FAD2D2' }]}
        onPress={() => handlePress('marital', '/Components/DAS/Questionnaire')}
      >
        {loading && selectedCategory === 'marital' ? (
          <LottieView
            source={require('../../assets/lottie/LoadingElepGre.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        ) : (
          <>
            <Image source={require('../../assets/images/marital.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Marital{"\n"}Depression</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Postpartum Depression */}
      <TouchableOpacity
        style={[styles.categoryBox, { backgroundColor: '#D2FAD2' }]}
        onPress={() => handlePress('postpartum', '/Components/EPDS/Questionnaire')}
      >
        {loading && selectedCategory === 'postpartum' ? (
          <LottieView
            source={require('../../assets/lottie/LoadingElepGre.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        ) : (
          <>
            <Image source={require('../../assets/images/postpartum.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Postpartum{"\n"}Depression</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Adult Depression */}
      <TouchableOpacity
        style={[styles.categoryBox, { backgroundColor: '#FADCA2' }]}
        onPress={() => handlePress('adult', '/Components/GDS/Questionnaire')}
      >
        {loading && selectedCategory === 'adult' ? (
          <LottieView
            source={require('../../assets/lottie/LoadingElepGre.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        ) : (
          <>
            <Image source={require('../../assets/images/adult.png')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Adult{"\n"}Depression</Text>
          </>
        )}
      </TouchableOpacity>
    </View>

      {/* Articles Section */}
      <View style={styles.articlesContainer}>
        <Text style={[styles.articleTitle, { color: theme.textPrimary }]}>Articles</Text>

        {/* Scrollable Articles */}
        <ScrollView style={styles.articleScrollView} contentContainerStyle={{ paddingBottom: 220 }}>
          {/* Article 1 */}
          <TouchableOpacity style={[styles.articleBox, { backgroundColor: theme.semi_container }]} onPress={() => setModalVisible(true)}>
            <View style={styles.articleContent}>
              <Text style={[styles.articleHeading, { color: theme.textPrimary }]}>Postpartum Depression : </Text>
              <Text style={[styles.articleText, { color: theme.dimText }]}>
                A Comprehensive Overview of Causes, Symptoms, Diagnosis, and Treatment
              </Text>
            </View>
            <Image
              source={require('../../assets/images/postpartum.png')}
              style={styles.articleImage}
            />
          </TouchableOpacity>
          <Article1 modalVisible={modalVisible} setModalVisible={setModalVisible} />

          {/* Article 2 */}
          <TouchableOpacity style={[styles.articleBox, { backgroundColor: theme.semi_container }]}>
            <View style={styles.articleContent}>
              <Text style={[styles.articleHeading, { color: theme.textPrimary }]}>Article 2</Text>
              <Text style={[styles.articleText, { color: theme.dimText }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
            <Image
              source={require('../../assets/images/marital.png')}
              style={styles.articleImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.articleBox, { backgroundColor: theme.semi_container }]}>
            <View style={styles.articleContent}>
              <Text style={[styles.articleHeading, { color: theme.textPrimary }]}>Article 3</Text>
              <Text style={[styles.articleText, { color: theme.dimText }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
            <Image
              source={require('../../assets/images/marital.png')}
              style={styles.articleImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.articleBox, { backgroundColor: theme.semi_container }]}>
            <View style={styles.articleContent}>
              <Text style={[styles.articleHeading, { color: theme.textPrimary }]}>Article 4</Text>
              <Text style={[styles.articleText, { color: theme.dimText }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
            <Image
              source={require('../../assets/images/marital.png')}
              style={styles.articleImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.articleBox, { backgroundColor: theme.semi_container }]}>
            <View style={styles.articleContent}>
              <Text style={[styles.articleHeading, { color: theme.textPrimary }]}>Article 5</Text>
              <Text style={[styles.articleText, { color: theme.dimText }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
            <Image
              source={require('../../assets/images/marital.png')}
              style={styles.articleImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.articleBox, { backgroundColor: theme.semi_container }]}>
            <View style={styles.articleContent}>
              <Text style={[styles.articleHeading, { color: theme.textPrimary }]}>Article 6</Text>
              <Text style={[styles.articleText, { color: theme.dimText }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
            <Image
              source={require('../../assets/images/marital.png')}
              style={styles.articleImage}
            />
          </TouchableOpacity>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FAF6',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    marginLeft: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#016A70',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -1,
    top: -1,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  categoryBox: {
    width: 155,
    height: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  categoryImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  articlesContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  articleScrollView: {
    maxHeight: 500, // Allow scrolling only in articles
    paddingBottom: 200,
  },
  articleBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  articleImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 10,
  },
  articleContent: {
    flex: 1,
  },
  articleHeading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  articleText: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 1,
    width: 100, // Adjust the size of the animation
    height: 100, // Adjust the size of the animation
  },
  lottie: {
    width: 150, // Adjust to your desired size
    height: 150, // Adjust to your desired size
  },
});
