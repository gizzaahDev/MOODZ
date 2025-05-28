import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Svg from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import ImageCatComponent from './ImageCatComponent.js';
import { Ionicons } from '@expo/vector-icons';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import { router } from 'expo-router';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const colors = [
  '#2D033B', '#40065B', '#52097B', '#650C9B', '#770EBB', '#8910DB', '#9B12FB', '#AE33FF',
  '#C066FF', '#D399FF', '#E6CCFF', '#F2E6FF', '#003333', '#006666', '#009999', '#00CCCC',
  '#00FFFF', '#19FFFF', '#33FFFF', '#4DFFFF', '#66FFFF', '#80FFFF', '#99FFFF', '#B3FFFF',
  '#CCFFFF', '#E6FFFF', '#3D2B1F', '#5C3D2E', '#7B4F3D', '#9A614C', '#B9735B', '#D8856A',
  '#F79679', '#FFA07A', '#FFB299', '#FFC4B8', '#FFD6D6', '#665000', '#806600', '#997A00',
  '#B38F00', '#CCA300', '#E6B800', '#FFCC00', '#FFD119', '#FFD633', '#FFDB4D', '#FFE066',
  '#FFE580', '#FFEA99', '#FFEEB3', '#FFF3CC', '#FFF7E6', '#663300', '#804000', '#995000',
  '#B36000', '#CC7000', '#E68000', '#FF9000', '#FFA319', '#FFB633', '#FFC94D', '#FFD966',
  '#FFE680', '#FFEE99', '#FFF5B3', '#FFFBCC', '#FFFFE6', '#004040', '#005050', '#006060',
  '#007070', '#008080', '#009A9A', '#00B4B4', '#00CFCF', '#00E9E9', '#00FFFF', '#1AFFff',
  '#33FFFF', '#4DFFFF', '#66FFFF', '#80FFFF', '#120A8F', '#2E1A47', '#483D8B', '#6A5ACD',
  '#836FFF', '#9370DB', '#BA55D3', '#D8BFD8', '#E6E6FA', '#FAE6E6', '#FFDDC1', '#FFABAB',
  '#FF7777', '#FF5555', '#FF3333', '#0D0D0D', '#1A1A1A', '#262626', '#333333', '#404040',
  '#4D4D4D', '#595959', '#666666', '#737373', '#808080', '#8C8C8C', '#999999', '#A6A6A6',
  '#B3B3B3', '#BFBFBF', '#CCCCCC', '#D9D9D9', '#E6E6E6', '#F2F2F2', '#FFFFFF', '#000033',
  '#000066', '#000099', '#0000CC', '#0000FF', '#1919FF', '#3333FF', '#4D4DFF', '#6666FF',
  '#8080FF', '#9999FF', '#B3B3FF', '#CCCCFF', '#E6E6FF', '#003300', '#004D00', '#006600',
  '#008000', '#009A00', '#00B400', '#00CF00', '#00E900', '#00FF00', '#1AFF1A', '#33FF33',
  '#4DFF4D', '#66FF66', '#80FF80', '#99FF99', '#330000', '#660000', '#990000', '#CC0000',
  '#FF0000', '#FF1919', '#FF3333', '#FF4D4D', '#FF6666', '#FF8080', '#FF9999', '#FFB3B3',
  '#FFCCCC', '#FFE6E6',
];

const ColoringTask = () => {
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [fillColors, setFillColors] = useState({});
  const [showArrow, setShowArrow] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const viewShotRef = useRef(null);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handlePathPress = (pathId) => {
    setFillColors((prevColors) => ({
      ...prevColors,
      [pathId]: selectedColor,
    }));
  };

  const handleSaveImage = () => {
    if (viewShotRef.current) {
      viewShotRef.current.capture().then((uri) => {
        console.log('Image saved to:', uri);
        saveImage(uri);
      });
    }
  };

  const saveImage = async (uri) => {
    try {
      const fileName = `coloring_task_${new Date().getTime()}.jpg`;
      const path = `${RNFS.PicturesDirectoryPath}/${fileName}`;
      const newUri = await RNFS.copyFile(uri, path);
      await CameraRoll.save(newUri, { type: 'photo' });
      console.log('Image successfully saved to gallery!', newUri);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleScroll = (event) => {
    const contentWidth = event.nativeEvent.contentSize.width;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const visibleWidth = event.nativeEvent.layoutMeasurement.width;

    if (contentOffsetX + visibleWidth >= contentWidth - 5) {
      setIsEnd(true);
      setShowArrow(true);
    } else if (contentOffsetX === 0) {
      setIsEnd(false);
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  const handleDone = async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) return;

      const today = new Date().toISOString().split('T')[0];
      const userRef = firestore()
        .collection('UsersEpds')
        .doc(userId)
        .collection('CompletedActivities')
        .doc(today);

      const userDoc = await userRef.get();
      const data = userDoc.data() || { coloringTask: {}, hearts: 0, leaves: 0, activityType: {}, completedActivities: [] };

      let updatedHearts = (data.hearts || 0) + 10;
      let updatedLeaves = data.leaves || 0;
      if (updatedHearts >= 100) {
        updatedHearts = 0;
        updatedLeaves += 1;
      }

      const todayHistory = data.coloringTask?.[today] || {};

      const completedActivity = {
        category: 'Creative and Cognitive Activities',
        title: 'Creative Art',
        description: 'Simple coloring or sketching tasks.',
        date: today,
      };

      await userRef.set(
        {
          hearts: updatedHearts,
          leaves: updatedLeaves,
          activityType: {
            ...data.activityType,
            category: 'Creative and Cognitive Activities',
            title: 'Creative Art',
            description: 'Simple coloring or sketching tasks.',
          },
          coloringTask: {
            ...data.coloringTask,
            [today]: {
              totalDays: (todayHistory.totalDays || 0) + 1,
              streakDays: todayHistory.streakDays || 0,
              playCount: (todayHistory.playCount || 0) + 1,
            },
          },
          completedActivities: [...(data.completedActivities || []), completedActivity],
        },
        { merge: true }
      );

      router.push('/Components/EPDS/SubComponents/EPDSMyActivity');
    } catch (error) {
      console.error('Error saving coloring task:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coloring Task</Text>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
        <View style={styles.svgContainer}>
          <Svg width="90%" height="90%" viewBox="0 0 4292 5126">
            <ImageCatComponent fillColors={fillColors} onPathPress={handlePathPress} />
          </Svg>
        </View>
      </ViewShot>

      <View style={styles.colorPaletteContainer}>
        {showArrow && !isEnd && (
          <Ionicons name="arrow-forward" size={24} color="#016A70" style={styles.arrow} />
        )}
        <ScrollView
          horizontal
          style={styles.colorPalette}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorButton,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColorButton
              ]}
              onPress={() => handleColorSelect(color)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveImage}>
          <Text style={styles.buttonText}>Save Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDone}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
    color: '#016A70',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(1, 106, 112, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  svgContainer: {
    width: 400,
    height: 533,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 55,
  },
  colorPaletteContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 65,
    position: 'relative',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    bottom: 40,
  },
  colorPalette: {
    flexGrow: 1,
    height: 60,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  colorButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  selectedColorButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 3,
    borderColor: '#016A70',
    transform: [{ scale: 1.1 }],
  },
  arrow: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  button: {
    backgroundColor: '#016A70',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#016A70',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    transform: [{ scale: 1 }],
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default ColoringTask;
