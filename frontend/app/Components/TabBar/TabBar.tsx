import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import React, { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabbarButton from './TabbarButton';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  
  const [buttonWidths, setButtonWidths] = useState<number[]>([]);
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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View style={styles.tabbar}>
      {/* Animated background */}
      <Animated.View
        style={[
          animatedStyle,
          styles.animatedBackground,
          {
            width: buttonWidths[state.index] - 10, // Match button width
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          // Calculate X position based on widths
          const positionX = buttonWidths.slice(0, index).reduce((acc, w) => acc + w, 0);
          tabPositionX.value = withSpring(positionX, { 
            damping: Math.max(0.1, 35), // Ensure damping is > 0
            stiffness: 500 
          });
          

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
            color={isFocused ? '#016A70' : '#222'}
            label={label}
            onLayout={onButtonLayout(index)} // Capture button layout
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    backgroundColor: '#F3FAF4',
    borderRadius: 30,
    height: 50, 
    marginHorizontal: 20,
  },
});
