import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import lightTheme from './themes/light';
import darkTheme from './themes/dark';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // Detect system theme
  const theme = systemTheme === 'dark' ? darkTheme : lightTheme; // Choose theme based on system

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
