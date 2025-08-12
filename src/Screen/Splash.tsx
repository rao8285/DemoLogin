import { View, SafeAreaView, Image, Animated, StatusBar } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../Navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
const Splash: React.FC<SplashProps> = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0.72)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { user, isLoading } = useContext(AuthContext);
  console.log("ffffffffff",user)

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     Animated.parallel([
  //       Animated.timing(scaleAnim, {
  //         toValue: 1,
  //         duration: 2000,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(opacityAnim, {
  //         toValue: 1,
  //         duration: 2000,
  //         useNativeDriver: true,
  //       }),
  //     ]).start(() => {
  //       if (user) {
  //         navigation.replace('Home');
  //       } else {
  //         navigation.replace('Login');
  //       }
  //     });
  //   }, 1000);

  //   return () => clearTimeout(timeout);
  // }, [scaleAnim, opacityAnim]);
  
  
  useEffect(() => {
  if (isLoading) return; // wait until loading finishes

  const timeout = setTimeout(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (user) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    });
  }, 1000);

  return () => clearTimeout(timeout);
}, [isLoading, user, navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Animated.Image
        source={require('../assets/spl.png')}
        style={[
          styles.image,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default Splash;
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(300),
    height: verticalScale(300),
    resizeMode: 'contain',
  },
});
