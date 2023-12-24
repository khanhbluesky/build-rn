import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ButtonIcon = ({disabled, onPress, backgroundColor, borderColor, color}) => {
  return (
    <View
      style={{
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: backgroundColor,
          borderWidth: 2,
          borderColor: borderColor,
          borderRadius: 20,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        disabled={disabled}
        onPress={onPress}>
        <FontAwesome6 name={'arrow-right'} size={20} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonIcon;
