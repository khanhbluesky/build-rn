import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const NumericInput = ({title, value, setValue}) => {
//   const [value, setValue] = useState(0);

  const handleIncrease = () => {
    setValue(value + 1);
  };

  const handleDecrease = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleInputChange = text => {
    // Chỉ cho phép nhập số
    if (/^\d+$/.test(text)) {
      setValue(parseInt(text, 10));
    }
  };

  return (
    <View style={styles.numericContainer}>
      <Text style={styles.numericLabel}>{title}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.inputText}
            keyboardType="numeric"
            value={value.toString()}
            onChangeText={handleInputChange}
          />

          <FontAwesome6
            name={'scale-balanced'}
            size={20}
            color={'#065956'}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputIcon}>
          <TouchableOpacity
            style={{
              flex: 1,
              fontSize: 20,
              backgroundColor: '#ccc',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 5,
            }}
            onPress={handleDecrease}>
            <Text style={{fontSize: 20}}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              fontSize: 20,
              backgroundColor: '#ccc',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleIncrease}>
            <Text style={{fontSize: 20}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NumericInput;

const styles = StyleSheet.create({
  numericContainer: {
    marginBottom: 20,
  },
  numericLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWithIcon: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  inputText: {
    minWidth: 50,
    textAlign: 'center',
    color: '#222',
    flex: 1,
  },
  icon: {
    flex: 0.2,
    textAlign: 'center',
  },
  inputIcon: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
});
