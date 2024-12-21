import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function FontLoader({ children }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        asul: require('./assets/fonts/Asul-Regular.ttf'),
        spacemono: require('./assets/fonts/SpaceMono-Regular.ttf'),
        poppins: require('./assets/fonts/Poppins-Bold.ttf'),
        times: require('./assets/fonts/times.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or a loading spinner, if desired
  }

  return children;
}
