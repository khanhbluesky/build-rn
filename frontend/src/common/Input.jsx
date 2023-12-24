import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, Animated} from 'react-native';

export default function Input({
  title,
  error,
  setValue,
  setError,
  secureTextEntry = false,
  onChangeText,
  label,
  ...props
}) {
  const animatedValue = useRef(new Animated.Value(props.value ? 1 : 0)).current;
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || props.value ? 1 : 0,
      duration: 100,
      useNativeDriver: true, // Sử dụng Native Driver
    }).start();
  }, [isFocused, props.value, animatedValue]);

  const labelStyle = {
    position: 'absolute',
    left: 0,
    fontWeight: 'bold',
    paddingLeft: 14,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [props.value ? 16 : 16, 2],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.9],
        }),
      },
    ],
    fontSize: 12,
    color: '#929292',
    // opacity: animatedValue,
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
          paddingHorizontal: 16,
        }}>
        {/* <Text style={{color: '#70747a', marginVertical: 6}}>{title}</Text> */}

        {/* <Text style={{color: error ? '#ff5555' : '#70747a', marginVertical: 6}}>
          {error ? error : ''}
        </Text> */}
      </View>

      <View
        style={{
          height: 50,
          borderRadius: 5,
          backgroundColor: '#EDEDED', //#e1e2e4
          borderWidth: 2,
          borderColor: isFocused ? '#202020' : 'transparent',
        }}>
        <Animated.Text
          style={labelStyle}
          shouldRasterizeIOS // Chỉ sử dụng cho iOS
        >
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry}
          onChangeText={text => {
            setValue(text);
            onChangeText(text);
            if (error) {
              setError('');
            }
          }}
          style={{
            borderWidth: 1,
            borderColor: error ? '#ff5555' : 'transparent',
            paddingHorizontal: 16,
            textAlignVertical: 'bottom',
          }}
        />
      </View>
    </View>
  );
}
