import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { s } from 'react-native-size-matters';

import { SplashImage } from '@/assets';
import { COLORS, View } from '@/ui';

const Splash = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fadeOut = () => {
      Animated.sequence([
        // Hold for 2 seconds
        Animated.delay(1000),
        // Then fade out over 1 second
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Navigate to main screen after animation completes
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'TransactionList' }],
          }),
        );
      });
    };

    fadeOut();
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={SplashImage}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                }),
              },
            ],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: s(200),
    height: s(200),
  },
});

export { Splash };
