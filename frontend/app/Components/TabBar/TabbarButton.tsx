import { View, Text, Pressable, StyleSheet, LayoutChangeEvent, GestureResponderEvent } from 'react-native';
import React, { useEffect, useState } from 'react';
import { icon } from '@/app/constants/icon';

type IconKeys = 'index' | 'ongoingTask' | 'progress' | 'userProfile';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from "../../ThemeContext";

const TabbarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
  onLayout,
}: {
  onPress: (event: GestureResponderEvent) => void,
  onLongPress: (event: GestureResponderEvent) => void,
  isFocused: boolean,
  routeName: string,
  color: string,
  label: string,
  onLayout: (e: LayoutChangeEvent) => void,
}) => {
  const scale = useSharedValue(0);
  const { theme } = useTheme() as { theme: any };

  // Tooltip State
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { damping: Math.max(0.1, 50), stiffness: 300 });
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  // Handle Long Press - Show Tooltip
  const handleLongPress = () => {
    setShowTooltip(true); // Show tooltip
    setTimeout(() => setShowTooltip(false), 1200); // Hide tooltip after 1.5 seconds
  };

  return (
    <Pressable
      onPress={onPress}
      onLongPress={handleLongPress} // Trigger tooltip
      style={styles.tabbarItem}
      onLayout={onLayout}
    >
      {/* Tooltip View */}
      {showTooltip && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{label}</Text>
        </View>
      )}

      <Animated.View style={animatedIconStyle}>
        {icon[routeName as IconKeys]({
          color: isFocused ? theme.tabActiveIcon : theme.tabInactive,
        })}
      </Animated.View>

      {/* Label */}
      <Animated.Text 
  style={[
    {
      color: theme.tabInactive, // Use single text color from theme
      fontSize: 12,
    }, 
    animatedTextStyle
  ]}
>
  {label}
</Animated.Text>

    </Pressable>
  );
};

export default TabbarButton;

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    
  },

  // Tooltip Style
  tooltip: {
    position: 'absolute',
    top: -70,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    zIndex: 10,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
  },
});
