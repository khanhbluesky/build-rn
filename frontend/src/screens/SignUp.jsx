import {
  Text,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Input from '../common/Input';
import Title from '../common/Title';
import Button from '../common/Button';

export default function SignUp({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  function onSignUp() {
    console.log(
      'onSignUp:',
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
    );

    // Check firstName
    const failFirstName = !firstName;
    if (failFirstName) {
      setFirstNameError('First Name not provided');
    }

    // Check lastName
    const failLastName = !lastName;
    if (failLastName) {
      setLastNameError('Last Name not provided');
    }

    // Check username
    const failUsername = !username || username.length < 5;
    if (failUsername) {
      setUsernameError('Username must be >= 5 characters');
    }

    // Check password
    const failPassword = !password && password < 8;
    if (failPassword) {
      setPasswordError('Password is too short');
    }

    // Check confirmPassword
    const failConfirmPassword = password !== confirmPassword;
    if (failConfirmPassword) {
      setConfirmPasswordError("Password don't match");
    }

    // Break out of this function of there were any issues
    if (
      failFirstName ||
      failLastName ||
      failUsername ||
      failPassword ||
      failConfirmPassword
    ) {
      return;
    }

    // Make signin request
    // api({
    //   method: 'POST',
    //   url: '/chat/signup/',
    //   data: {
    //     first_name: firstName,
    //     last_name: lastName,
    //     username: username,
    //     password: password,
    //   },
    // })
    //   .then(response => {
    //     utils.log('Sign Up:', response.data);
    //     const credentials = {
    //       username: username,
    //       password: password,
    //     };
    //     login(credentials, response.data.user, response.data.tokens);
    //   })
    //   .catch(error => {
    //     if (error.response) {
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       console.log(error.request);
    //     } else {
    //       console.log('Error', error.message);
    //     }
    //     console.log(error.config);
    //   });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 20,
              }}>
              <Title
                text={'RealtimeLogistic'}
                color={'#202020'}
                fontSize={48}
                fontFamily={'LeckerliOne-Regular'}
              />

              <Input
                title="First name"
                value={firstName}
                error={firstNameError}
                setValue={setFirstName}
                setError={setFirstNameError}
              />

              <Input
                title="Last name"
                value={lastName}
                error={lastNameError}
                setValue={setLastName}
                setError={setLastNameError}
              />

              <Input
                title={'Username'}
                value={username}
                error={usernameError}
                setValue={setUsername}
                setError={setUsernameError}
              />

              <Input
                title={'Password'}
                value={password}
                error={passwordError}
                setValue={setPassword}
                setError={setPasswordError}
              />

              <Input
                title={'Confirm Password'}
                value={confirmPassword}
                error={confirmPasswordError}
                setValue={setConfirmPassword}
                setError={setConfirmPasswordError}
              />

              <Button
                title={'Sign Up'}
                onPress={onSignUp}
                width={{}}
                backgroundColor={'#202020'}
                borderRadius={26}
                color={'white'}
              />

              <Text style={{textAlign: 'center', marginTop: 40}}>
                Already have an account?{' '}
                <Text
                  style={{color: 'blue'}}
                  onPress={() => navigation.goBack()}>
                  Sign Up
                </Text>
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <Title
            text={'RealtimeLogistic'}
            color={'#202020'}
            fontSize={48}
            fontFamily={'LeckerliOne-Regular'}
          />

          <Input
            title="First name"
            value={firstName}
            error={firstNameError}
            setValue={setFirstName}
            setError={setFirstNameError}
          />

          <Input
            title="Last name"
            value={lastName}
            error={lastNameError}
            setValue={setLastName}
            setError={setLastNameError}
          />

          <Input
            title={'Username'}
            value={username}
            error={usernameError}
            setValue={setUsername}
            setError={setUsernameError}
          />

          <Input
            title={'Password'}
            value={password}
            error={passwordError}
            setValue={setPassword}
            setError={setPasswordError}
          />

          <Input
            title={'Confirm Password'}
            value={confirmPassword}
            error={confirmPasswordError}
            setValue={setConfirmPassword}
            setError={setConfirmPasswordError}
          />

          <Button
            title={'Sign Up'}
            onPress={onSignUp}
            width={{}}
            backgroundColor={'#202020'}
            borderRadius={26}
            color={'white'}
          />

          <Text style={{textAlign: 'center', marginTop: 40}}>
            Already have an account?{' '}
            <Text style={{color: 'blue'}} onPress={() => navigation.goBack()}>
              Sign Up
            </Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
