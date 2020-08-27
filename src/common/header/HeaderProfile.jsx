import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { logout } from '../../modules/auth/Auth.actions';
import { withTheme } from '../theme/Theme';
import { compose } from 'redux';
import { colors } from '../../../theme';
import AuthService from '../../modules/auth/Auth.service';
import UserService from '../../services/user/User.service';

export class HeaderProfile extends Component {
  onPress = async () => {
    await AuthService.logout();
    await UserService.setUser(null);
    this.props.navigation.push('Login');
  };
  render() {
    const { colors } = this.props;
    return <EvilIcons name="user" size={36} color={colors.text} onPress={this.onPress} />;
  }
}

HeaderProfile.propTypes = {
  colors: PropTypes.shape({
    text: PropTypes.string
  })
};

HeaderProfile.defaultProps = {
  colors: colors
};

const mapDispatchToProps = {
  logout
};

export default compose(withTheme, connect(null, mapDispatchToProps))(HeaderProfile);
