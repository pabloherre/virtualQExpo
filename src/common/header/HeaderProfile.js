import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { logout } from '../../modules/auth/Auth.actions';
import { withTheme } from '../theme/Theme';
import { compose } from 'redux';

class HeaderProfile extends Component {
  render() {
    const {
      theme: { colors }
    } = this.props;
    return (
      <EvilIcons
        name="user"
        size={36}
        color={colors.text}
        onPress={async () => {
          this.props.logout();
          try {
            await AsyncStorage.removeItem('user');
          } catch (e) {
            console.error(e);
          }
          this.props.navigation.push('Login');
        }}
      />
    );
  }
}

HeaderProfile.propTypes = {};

const mapDispatchToProps = {
  logout
};

export default compose(withTheme, connect(null, mapDispatchToProps))(HeaderProfile);
