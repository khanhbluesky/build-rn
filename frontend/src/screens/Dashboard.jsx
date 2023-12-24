import {Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, MenuScreen, ProfileScreen, ServiceScreen} from '..';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import useGlobal from '../core/global';
import utils from '../core/utils';

const Tab = createBottomTabNavigator();

export default function Dashboard({navigation}) {
  const user = useGlobal(state => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitleStyle: {color: '#202020', fontFamily: 'LeckerliOne-Regular'},
        headerLeft: () => (
          <View
            style={{
              marginLeft: 16,
              width: 40,
              height: 40,
              borderRadius: 15,
              backgroundColor: '#e0e0e0AA',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
              }}
              source={utils.thumbnail(user.thumbnail)}
            />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={{}}>
            <FontAwesome6
              style={{marginRight: 16}}
              name={'magnifying-glass'}
              size={22}
              color={'#404040'}
            />
          </TouchableOpacity>
        ),
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'house' : 'house';
          } else if (route.name === 'Service') {
            iconName = focused ? 'chart-simple' : 'chart-simple'; //coins
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'chart-simple' : 'chart-simple';
          }

          return (
            <FontAwesome6 name={iconName} size={size} color={color} /> //#00C4BF
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#202020',
        headerTitleAlign: 'center',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Service" component={ServiceScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
