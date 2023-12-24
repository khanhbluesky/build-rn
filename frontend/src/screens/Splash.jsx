import {View, Text, SafeAreaView, StatusBar, Animated} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import Title from '../common/Title';

export default function Splash({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const translateY = new Animated.Value(0);
  const duration = 800;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        hidden={true}
        translucent={true}
      />
      <Animated.View style={[{transform: [{translateY}]}]}>
        <Title
          text={'RealtimeLogistic'}
          color={'white'}
          fontSize={46}
          fontFamily={'LeckerliOne-Regular'}
          onPress={() => {}}
        />
      </Animated.View>
    </SafeAreaView>
  );
}
