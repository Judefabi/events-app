import { View, StyleSheet, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

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
    </View>
  );
};

export default LoadingSkeleton;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    padding: 16,
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
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  tabsView: {
    width: "100%",
    height: 30,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  featuredEventsView: {
    width: "100%",
    height: 150,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  otherEventsView: {
    width: "100%",
    height: 200,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
  },
});
