import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { logout } from '../../modules/auth/Auth.actions';

class HeaderProfile extends Component {
  render() {
    return (
      <EvilIcons
        name="user"
        size={36}
        color="#a1a2a4"
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

export default connect(null, mapDispatchToProps)(HeaderProfile);
