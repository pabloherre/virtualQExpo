import 'react-native-gesture-handler';

import React from 'react';
import { DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

import initFeathersClient from './src/setup/feathersClient';
import FlashMessage from 'react-native-flash-message';
import withSideMenu from './src/common/sideMenu/SideMenuHOC';
import Menu from './src/common/sideMenu/SideMenu';

initFeathersClient();

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
          headerTitle: 'Back'
        }}
      />
      <Stack.Screen
        name="Appointments"
        component={withSideMenu(AppointmentsView, Menu)}
        options={({ navigation }) => ({
          headerTitle: 'My Appointments',
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
