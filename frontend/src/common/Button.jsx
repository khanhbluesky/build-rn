import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Button({
  title,
  onPress,
  width,
  backgroundColor,
  borderRadius,
  color,
  disabled,
}) {
  return (
    <TouchableOpacity
      style={{
        width: width,
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={{
          color: color,
          fontSize: 18,
          fontFamily: 'Pacifico-Regular',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
