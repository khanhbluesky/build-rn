import {Text} from 'react-native';
import React from 'react';

export default function Title({text, color, fontSize, fontFamily, onPress}) {
  return (
    <Text
      style={{
        color: color,
        textAlign: 'center',
        fontSize: fontSize,
        fontFamily: fontFamily,
      }}
      onPress={onPress}>
      {text}
    </Text>
  );
}
