// frontend/app/Components/EPDS/SubComponents/ActivityPages/Activity12/GratitudeList.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, StatusBar, Modal } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off');
  const [permission, requestPermission] = useCameraPermissions();
  const [latestImage, setLatestImage] = useState<string | null>(null);
  const [isAutoFocus, setIsAutoFocus] = useState(true);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  React.useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await requestPermission();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
        alert('Permission to access camera and media library is required!');
      }
    })();
  }, []);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera access needed</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => setFacing(current => current === 'back' ? 'front' : 'back');
  
  const toggleFlash = () => {
    setFlashMode(current => {
      if (current === 'off') return 'on';
      if (current === 'on') return 'auto';
      return 'off';
    });
  };

  const toggleAutoFocus = () => setIsAutoFocus(current => !current);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const imagePath = `${FileSystem.documentDirectory}EPDScam/images/${Date.now()}.jpg`;
        
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}EPDScam/images`, { 
          intermediates: true 
        });
        
        await FileSystem.moveAsync({ 
          from: photo.uri, 
          to: imagePath 
        });

        setLatestImage(imagePath);
        await MediaLibrary.saveToLibraryAsync(imagePath);

        // Save the image URI to AsyncStorage
        await AsyncStorage.setItem('capturedImageUri', imagePath);

      } catch (error) {
        console.error('Failed to take picture:', error);
      }
    }
  };

  const openPreview = () => {
    setIsPreviewVisible(true);
  };

  const closePreview = () => {
    setIsPreviewVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flashMode={flashMode}
        autoFocus={isAutoFocus ? 'on' : 'off'}
      >
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleFlash}>
            <MaterialIcons 
              name={flashMode === 'off' ? 'flash-off' : flashMode === 'on' ? 'flash-on' : 'flash-auto'} 
              size={24} 
              color="#fff" 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={toggleAutoFocus}>
            <MaterialIcons 
              name={isAutoFocus ? 'center-focus-strong' : 'center-focus-weak'} 
              size={24} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
      </CameraView>

      <View style={styles.absoluteBottomControls}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureInner} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {latestImage && (
        <TouchableOpacity style={styles.previewContainer} onPress={openPreview}>
          <Image source={{ uri: latestImage }} style={styles.previewImage} />
        </TouchableOpacity>
      )}

      <Modal visible={isPreviewVisible} transparent={true} onRequestClose={closePreview}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closePreview}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <Image source={{ uri: latestImage || '' }} style={styles.fullPreviewImage} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: StatusBar.currentHeight || 0,
  },
  absoluteBottomControls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    padding: 15,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
  },
  previewContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  previewImage: {
    width: 80,
    height: 80,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  fullPreviewImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
});