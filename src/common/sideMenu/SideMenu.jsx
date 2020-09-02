import React from 'react';
import { connect } from 'react-redux';
import RoundedButton from '../buttons/RoundedButton/RoundedButton';
import { View } from 'react-native';
import AuthService from '../../modules/auth/Auth.service';
import UserService from '../../services/user/User.service';
import { colors } from '../../../theme';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { SideMenuService } from './SideMenu.service';
import Typography from '../typography/Typography';
import { setTestInfo } from '../../utils/test.utils';

export class Menu extends React.Component {
  onPress = async () => {
    SideMenuService.closeMenu();
    await AuthService.logout();
    await UserService.setUser(null);
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'stretch',
          backgroundColor: colors.card
        }}
      >
        <View
          style={{
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 20,
            marginHorizontal: 20,
            borderBottomColor: colors.border
          }}
        >
          <FontAwesome name="user-circle" size={120} color={colors.secondary} style={{ paddingBottom: 20 }} />
          <Typography color="secondary" size="small">
            {this.props.user && this.props.user.email}
          </Typography>
        </View>
        <View style={{ flex: 1, marginVertical: 10, width: 200, alignSelf: 'center', justifyContent: 'flex-end' }}>
          <RoundedButton
            startIcon={<SimpleLineIcons name="logout" size={24} color="white" />}
            label="Logout"
            onPress={this.onPress}
            {...setTestInfo('testTouchableLogout')}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};

export default connect(mapStateToProps, null)(Menu);
