import {View, Text} from 'react-native';
import React from 'react';
import Button from '../common/Button';

export default function Home({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingHorizontal: 20
        }}>
        <Button
          title={'Quote FCL'}
          backgroundColor={'#808080'}
          borderRadius={26}
          color={'white'}
          onPress={() => navigation.navigate('QuoteFCL')}
        />
        <Button
          title={'Quote LCL'}
          backgroundColor={'#FFA500'}
          borderRadius={26}
          color={'white'}
          onPress={() => navigation.navigate('QuoteLCL')}
        />
        <Button
          title={'Quote AIR'}
          backgroundColor={'#87CEEB'}
          borderRadius={26}
          color={'white'}
          onPress={() => navigation.navigate('QuoteAIR')}
        />
      </View>
    </View>
  );
}
