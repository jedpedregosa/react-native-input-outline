import React, { useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

export interface InputOutlineProps {}

export const InputOutline = () => {
  const inputRef = useRef<TextInput>(null);
  const textTranslation = useSharedValue(0);

  const handleFocus = () => {
    textTranslation.value = withTiming(-20);
    inputRef.current?.focus();
  };

  const handleUnfocus = () => {
    textTranslation.value = withTiming(0);
  };

  const animatedPlaceholderStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: textTranslation.value,
      },
      {
        scale: interpolate(textTranslation.value, [0, -20], [1, 0.85]),
      },
    ],
  }));

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 12,
      alignSelf: 'stretch',
      flexDirection: 'row',
    },
    inputContainer: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      justifyContent: 'center',
    },
    placeholder: {
      position: 'absolute',
      top: 12,
      left: 16,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      fontSize: 14,
    },
  });

  return (
    <Animated.View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleFocus}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            pointerEvents="none"
            onFocus={handleFocus}
            onSubmitEditing={handleUnfocus}
          />
        </View>
      </TouchableWithoutFeedback>
      <Animated.Text style={[styles.placeholder, animatedPlaceholderStyles]}>
        Placeholder
      </Animated.Text>
    </Animated.View>
  );
};
