/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DraggableList from './src/screens/DraggableList';
import { MediaPlayer } from './src/screens/MediaPlayer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { Setting } from './src/screens/Settings';
import Icon from 'react-native-vector-icons/AntDesign'
// import store from './src/redux/ReduxToolkit/store';


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName='MediaPlayer'>
      <Stack.Screen name="DraggableList" component={DraggableList}/>
      <Stack.Screen name="MediaPlayer" component={MediaPlayer} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return(
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="Settings" component={Setting} 
        options={({ navigation }) => ({
          title: 'Settings',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => Alert.alert('Are sure you want to logout')}
              style={{ marginRight: 15 }}
            >
              <Icon name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#f0f0f0',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#333',
          },
        })}
        />
      <Drawer.Screen name="DraggList" component={DraggableList}/>
      <Drawer.Screen name="MediaPlayer" component={MediaPlayer}/>
    </Drawer.Navigator>
  )
}

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login" 
            component={Login}
          />
          <Stack.Screen name="MainApp" component={AppDrawer} />
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
