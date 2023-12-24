import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DashboardScreen, HomeScreen, QuoteAIRScreen, QuoteFCLScreen, QuoteLCLScreen, SignInScreen, SignUpScreen, SplashScreen} from './src';
import useGlobal from './src/core/global';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const initialized = useGlobal(state => state.initialized);
  const authenticated = useGlobal(state => state.authenticated);

  const init = useGlobal(state => state.init);

  useEffect(() => {
    init();
  }, []);

  return (
    <NavigationContainer theme={LightTheme}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        // hidden={true}
        // translucent={true}
      />
      <Stack.Navigator>
        {!initialized ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
          </>
        ) : !authenticated ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="QuoteFCL" component={QuoteFCLScreen} />
            <Stack.Screen name="QuoteLCL" component={QuoteLCLScreen} />
            <Stack.Screen name="QuoteAIR" component={QuoteAIRScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
