import React from 'react';
import RoundedButton from '../buttons/RoundedButton/RoundedButton';
import { Text, View } from 'react-native';
import AuthService from '../../modules/auth/Auth.service';
import UserService from '../../services/user/User.service';
import { colors } from '../../../theme';
import { SimpleLineIcons } from '@expo/vector-icons';
import { SideMenuService } from './SideMenu.service';

class Menu extends React.Component {
  onPress = async () => {
    SideMenuService.closeMenu();
    await AuthService.logout();
    await UserService.setUser(null);
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: colors.card, paddingHorizontal: 10, paddingVertical: 10 }}>
        <View style={{ flex: 1 }}>
          <Text>User</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <RoundedButton startIcon={<SimpleLineIcons name="logout" size={24} color="white" />} label="Logout" onPress={this.onPress} />
        </View>
      </View>
    );
  }
}

export default Menu;
