import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabbarButton from './TabbarButton';
import { useTheme } from "../../ThemeContext";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [buttonWidths, setButtonWidths] = useState<number[]>([]);
  const { theme } = useTheme() as { theme: any };
  const tabPositionX = useSharedValue(0); // Animated position

  // Calculate the total width dynamically
  const onButtonLayout = (index: number) => (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;

    setButtonWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = width;
      return newWidths;
    });
  };

  // Update tab position when the state index changes (handles back button)
  useEffect(() => {
    if (buttonWidths.length > 0) {
      const positionX = buttonWidths
        .slice(0, state.index) // Calculate the X position based on the index
        .reduce((acc, w) => acc + w, 0);

      tabPositionX.value = withTiming(positionX, { duration: 200 }); // Smooth transition
    }
  }, [state.index, buttonWidths]); // Watch for changes in tab index or button widths

  // Smooth Animated Style without damping
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(tabPositionX.value, { duration: 200 }) }],
    };
  });

  return (
    <View style={[styles.tabbar, { backgroundColor: theme.tabBg }]}>
      {/* Animated background */}
      <Animated.View
        style={[
          animatedStyle,
          styles.animatedBackground,
          {
            width: buttonWidths[state.index] - 10, // Match button width
            backgroundColor: theme.tabActiveColor, // Update active tab color
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const positionX = buttonWidths
            .slice(0, index)
            .reduce((acc, w) => acc + w, 0);

          // Smooth Animation without damping
          tabPositionX.value = withTiming(positionX, { duration: 200 });

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabbarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={theme.tabInactive}
            label={label}
            onLayout={onButtonLayout(index)} // Capture button layout
          />
        );
      })}
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 50,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    // Shadow for Android
    elevation: 10,
  },

  animatedBackground: {
    position: 'absolute',
    borderRadius: 30,
    height: 50,
    marginHorizontal: 20,
  },
});
