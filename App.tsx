/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import PushNotificationIOS, { PushNotificationPermissions } from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { Provider } from 'react-redux';
import store from './src/redux/ReduxToolkit/store';
// import store from './src/redux/ReduxToolkit/store';


const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    console.log("render app.tsx");
    notificationPermission();
  }, [])
  async function notificationPermission() {
    PushNotificationIOS.requestPermissions().then((response: PushNotificationPermissions) => {
      console.log("permissions", response)
      if (response.authorizationStatus === 2) {
        // messaging().getToken().then(res => {
        //   console.log('fcmToken', res)
        // })
      }
    })
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name='Home' component={Home} options={{ title: 'Home' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
