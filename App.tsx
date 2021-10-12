import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import ColorPicker from "./components/ColorPicker";

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];

const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";

const { width } = Dimensions.get("window");

const PICKER_WIDTH = width * 0.9;

const CIRCLE_WIDTH = width * 0.8;

export default function App() {
  const PICKED_COLOR = useSharedValue<string | number>(COLORS[0]);

  const reanimatedStyle = useAnimatedStyle(() => {
    return { backgroundColor: PICKED_COLOR.value };
  });

  const onColorChanged = useCallback((color: string | number) => {
    "worklet";
    PICKED_COLOR.value = color;
  }, []);
  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, reanimatedStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          maxWidth={PICKER_WIDTH}
          onColorChanged={onColorChanged}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: { height: 40, width: PICKER_WIDTH, borderRadius: 20 },
  circle: {
    width: CIRCLE_WIDTH,
    height: CIRCLE_WIDTH,
    borderRadius: CIRCLE_WIDTH / 2,
  },
});
