import 'react-native-gesture-handler';

import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';

import HomeScreen from './src/views/Home/HomeView';
import RegisterView from './src/views/Register/RegisterView';
import AppointmentsView from './src/views/Appointments/AppointmentsView';
import store from './src/setup/store';
import LoginView from './src/views/Login/LoginView';

const Stack = createStackNavigator();
const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#fff' } };

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Appointments" component={AppointmentsView} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterView} />
          <Stack.Screen name="Login" component={LoginView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
