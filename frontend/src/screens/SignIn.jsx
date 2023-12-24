import {
  Text,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Input from '../common/Input';
import Title from '../common/Title';
import api from '../core/api';
import utils from '../core/utils';
import useGlobal from '../core/global';
import ButtonIcon from '../common/ButtonIcon';

export default function SignIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);

  const login = useGlobal(state => state.login);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = async () => {
    console.log('onSignIn:', username, password);

    // Check username
    const failUsername = !username;
    if (failUsername) {
      setUsernameError('Username not provided');
    }

    // Check password
    const failPassword = !password;
    if (failPassword) {
      setPasswordError('Password not provided');
    }

    // Break out of this function of there were any issues
    if (failUsername || failPassword) {
      return;
    }

    // Make signin request
    api({
      method: 'POST',
      url: '/login',
      data: {
        username: username,
        password: password,
      },
    })
      .then(response => {
        utils.log('Sign In:', response.data);

        const credentials = {
          username: username,
          password: password,
        };
        login(credentials, response.data.user, response.data.tokens);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
        Alert.alert('Login error', 'Invalid email or password');
      });
  };

  const handleUsernameChange = text => {
    setUsername(text);
    updateValidation(text, password);
  };

  const handlePasswordChange = text => {
    setPassword(text);
    updateValidation(username, text);
  };

  const updateValidation = (text1, text2) => {
    // Kiểm tra nếu cả hai ô đều không rỗng
    if (text1.trim() !== '' && text2.trim() !== '') {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
        backgroundColor: '#F9F9F9',
      }}>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flex: 1,
              }}>
              <View style={{flex: 1}}>
                <Text>SignIn</Text>
              </View>
              <View style={{flex: 2}}>
                <Title
                  text={'Đăng nhập'}
                  color={'#202020'}
                  fontSize={40}
                  fontFamily={'Pacifico-Regular'}
                />

                <Input
                  title={''}
                  label={'TÊN ĐĂNG NHẬP'}
                  value={username}
                  error={usernameError}
                  setValue={setUsername}
                  setError={setUsernameError}
                  onChangeText={handleUsernameChange}
                />

                <Input
                  title={''}
                  label={'MẬT KHẨU'}
                  value={password}
                  error={passwordError}
                  setValue={setPassword}
                  setError={setPasswordError}
                  secureTextEntry={true}
                  onChangeText={handlePasswordChange}
                />
              </View>
              <View style={{flex: 2, justifyContent: 'flex-end'}}>
                <ButtonIcon
                  disabled={!isEnabled}
                  onPress={onSignIn}
                  backgroundColor={isEnabled ? '#D13639' : 'white'}
                  borderColor={isEnabled ? '#D13639' : '#929292'}
                  color={isEnabled ? 'white' : '#929292'}
                />
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 40,
                    color: '#929292',
                    fontWeight: 'bold',
                  }}>
                  KHÔNG ĐĂNG NHẬP ĐƯỢC?
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 40,
                    color: '#929292',
                    fontWeight: 'bold',
                  }}>
                  Don't have an account?{' '}
                  <Text
                    style={{color: 'blue'}}
                    onPress={() => navigation.navigate('SignUp')}>
                    Sign Up
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <Text>SignIn</Text>
          </View>
          <View style={{flex: 2}}>
            <Title
              text={'Đăng nhập'}
              color={'#202020'}
              fontSize={40}
              fontFamily={'Pacifico-Regular'}
            />
            <Input
              title={''}
              label={'TÊN ĐĂNG NHẬP'}
              value={username}
              error={usernameError}
              setValue={setUsername}
              setError={setUsernameError}
              onChangeText={handleUsernameChange}
            />

            <Input
              title={''}
              label={'MẬT KHẨU'}
              value={password}
              error={passwordError}
              setValue={setPassword}
              setError={setPasswordError}
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
          </View>
          <View style={{flex: 2, justifyContent: 'flex-end', paddingBottom: 20}}>
            <ButtonIcon
              disabled={!isEnabled}
              onPress={onSignIn}
              backgroundColor={isEnabled ? '#D13639' : 'white'}
              borderColor={isEnabled ? '#D13639' : '#929292'}
              color={isEnabled ? 'white' : '#929292'}
            />
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 40,
                color: '#929292',
                fontWeight: 'bold',
              }}>
              KHÔNG ĐĂNG NHẬP ĐƯỢC?
            </Text>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 40,
                color: '#929292',
                fontWeight: 'bold',
              }}>
              Don't have an account?{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
