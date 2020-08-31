import 'react-native-gesture-handler';

import React, { useEffect, useRef } from 'react';
import { DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider } from 'react-redux';

import HomeScreen from './src/views/Home/HomeView';
import RegisterView from './src/views/Register/RegisterView';
import AppointmentsView from './src/views/Appointments/AppointmentsView';
import store from './src/setup/store';
import LoginView from './src/views/Login/LoginView';
import AppointmentDetailsView from './src/views/AppointmentDetails/AppointmentDetailsView';
import HeaderProfile from './src/common/header/HeaderProfile';
import HeaderNotification from './src/common/header/HeaderNotification';
import AppointmentNew from './src/views/AppointmentNew/AppointmentNew';
import QRCodeView from './src/views/QRCode/QRCode';
import { colors } from './theme';
import * as Notifications from 'expo-notifications';

import initFeathersClient from './src/setup/feathersClient';
import FlashMessage from 'react-native-flash-message';
import withSideMenu from './src/common/sideMenu/SideMenuHOC';
import Menu from './src/common/sideMenu/SideMenu';
import { NotificationService } from './src/common/notifications/Notification.service';

initFeathersClient();
NotificationService.initNotificationHandler();

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors
};

function StackScreen() {
  const theme = useTheme();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="AppointmentDetails"
        component={AppointmentDetailsView}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background
          },
          headerTitle: 'Back'
        }}
      />
      <Stack.Screen
        name="Appointments"
        component={withSideMenu(AppointmentsView, Menu)}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: theme.colors.background
          },
          headerTitle: 'My Turns',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: theme.colors.secondary },
          headerLeft: props => <HeaderProfile {...props} navigation={navigation} />,
          headerLeftContainerStyle: { paddingHorizontal: 10 },
          headerRight: props => <HeaderNotification {...props} />,
          headerRightContainerStyle: { paddingHorizontal: 10 }
        })}
      />
      <Stack.Screen
        name="AppointmentNew"
        component={AppointmentNew}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background
          },
          headerTitle: 'New Appointment',
          headerTitleStyle: { color: theme.colors.secondary },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterView}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginView}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    AsyncStorage.getItem('expoPushToken').then(token => {
      console.log(token);
      if (!token) {
        NotificationService.registerForPushNotificationsAsync().then(token => {
          AsyncStorage.setItem('expoPushToken', token);
        });
      }
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('notification');
      console.log(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('response');
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen name="Main" component={StackScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="QRCode" component={QRCodeView} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
      <FlashMessage position={'bottom'} floating={true} />
    </Provider>
  );
}
