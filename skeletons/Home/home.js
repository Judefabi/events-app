import { View, StyleSheet, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../globals/colors";

const ShimmerPlaceholder = ({ style }) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerValue]);

  const shimmerTranslate = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={style}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { transform: [{ translateX: shimmerTranslate }] },
        ]}>
        <LinearGradient
          colors={["#E0E0E0", "#F0F0F0", "#E0E0E0"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const LoadingSkeleton = () => {
  return (
    <View style={styles.mainContainer}>
      <ShimmerPlaceholder style={styles.topView} />
      <ShimmerPlaceholder style={styles.searchView} />
      <ShimmerPlaceholder style={styles.tabsView} />
      <ShimmerPlaceholder style={styles.featuredEventsView} />
      <ShimmerPlaceholder style={styles.otherEventsView} />
      <ShimmerPlaceholder style={styles.otherEventsView} />
    </View>
  );
};

export default LoadingSkeleton;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  topView: {
    width: "100%",
    height: 50,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  searchView: {
    width: "100%",
    height: 80,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    overflow: "hidden",
  },
  tabsView: {
    width: "100%",
    height: 250,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  featuredEventsView: {
    width: "100%",
    height: 100,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  otherEventsView: {
    width: "100%",
    height: 90,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
});
