import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { QuoteAIRScreen, QuoteFCLScreen, QuoteLCLScreen } from '..';

const MyComponent = () => {
  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  const [showContent3, setShowContent3] = useState(false);
  const [selectedButton, setSelectedButton] = useState(1);

  // const toggleContent = buttonNumber => {
  //   switch (buttonNumber) {
  //     case 1:
  //       setShowContent1(!showContent1);
  //       setShowContent2(false);
  //       setShowContent3(false);
  //       break;
  //     case 2:
  //       setShowContent1(false);
  //       setShowContent2(!showContent2);
  //       setShowContent3(false);
  //       break;
  //     case 3:
  //       setShowContent1(false);
  //       setShowContent2(false);
  //       setShowContent3(!showContent3);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const toggleContent = buttonNumber => {
    setSelectedButton(buttonNumber);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: selectedButton === 1 ? '#2ecc71' : '#3498db'},
          ]}
          onPress={() => toggleContent(1)}>
          <Text style={styles.buttonText}>Quote FCL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: selectedButton === 2 ? '#2ecc71' : '#3498db'},
          ]}
          onPress={() => toggleContent(2)}>
          <Text style={styles.buttonText}>Quote LCL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: selectedButton === 3 ? '#2ecc71' : '#3498db'},
          ]}
          onPress={() => toggleContent(3)}>
          <Text style={styles.buttonText}>Quote AIR</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, marginTop: 0}}>
        {selectedButton === 1 && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            {/* <Text>Content for Button 1</Text> */}
            <QuoteFCLScreen />
          </View>
        )}
        {selectedButton === 2 && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            {/* <Text>Content for Button 2</Text> */}
            <QuoteLCLScreen />
          </View>
        )}
        {selectedButton === 3 && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            {/* <Text>Content for Button 3</Text> */}
            <QuoteAIRScreen />
          </View>
        )}
      </View>
    </View>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    // padding: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    // borderRadius: 5,
    padding: 10,
    margin: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
