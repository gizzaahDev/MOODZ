import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off');
  const [permission, requestPermission] = useCameraPermissions();
  const [latestImage, setLatestImage] = useState<string | null>(null);
  const [isAutoFocus, setIsAutoFocus] = useState(true); // Auto-focus state
  const cameraRef = useRef<CameraView>(null);

  // Request camera and media library permissions
  React.useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await requestPermission();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
        alert('Permission to access camera and media library is required!');
      }
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Function to toggle between front and back camera
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  // Function to toggle flash mode
  const toggleFlash = () => {
    setFlashMode((current) => {
      if (current === 'off') return 'on';
      if (current === 'on') return 'auto';
      return 'off';
    });
  };

  // Function to toggle auto-focus
  const toggleAutoFocus = () => {
    setIsAutoFocus((current) => !current);
  };

  // Function to capture a photo
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo captured:', photo.uri);

// Save the image to EPDScam/images directory
const imagePath = `${FileSystem.documentDirectory}GDScam/images/${Date.now()}.jpg`;
await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}GDScam/images`, { intermediates: true });
await FileSystem.moveAsync({ from: photo.uri, to: imagePath });

      console.log('Image saved at:', imagePath);
      setLatestImage(imagePath);

      // Save the image to the camera roll
      await MediaLibrary.saveToLibraryAsync(imagePath);
      console.log('Image saved to camera roll');
    }
  };

  // Calculate 3:4 aspect ratio dimensions
  const screenWidth = Dimensions.get('window').width;
  const cameraHeight = (screenWidth * 4) / 3; // 3:4 aspect ratio

  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <CameraView
        ref={cameraRef}
        style={[styles.camera, { height: cameraHeight }]} // Set 3:4 aspect ratio
        facing={facing}
        flashMode={flashMode}
        autoFocus={isAutoFocus ? 'on' : 'off'} // Auto-focus control
      >
        <View style={styles.controls}>
          {/* Flash Toggle Button */}
          <TouchableOpacity
            onPress={toggleFlash}
            style={styles.button}
            onPressOut={(e) => e.stopPropagation()} // Prevent focus interference
          >
            <Text style={styles.buttonText}>
              Flash: {flashMode === 'off' ? 'Off' : flashMode === 'on' ? 'On' : 'Auto'}
            </Text>
          </TouchableOpacity>

          {/* Auto-Focus Toggle Button */}
          <TouchableOpacity onPress={toggleAutoFocus} style={styles.button}>
            <Text style={styles.buttonText}>
              Focus: {isAutoFocus ? 'Auto' : 'Manual'}
            </Text>
          </TouchableOpacity>

          {/* Capture Button */}
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>

          {/* Switch Camera Button */}
          <TouchableOpacity onPress={toggleCameraFacing} style={styles.button}>
            <Text style={styles.buttonText}>
              {facing === 'back' ? 'Front Camera' : 'Back Camera'}
            </Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* Display Latest Image */}
      {latestImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>Latest Image:</Text>
          <Image source={{ uri: latestImage }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#fff',
  },
  camera: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  captureButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});