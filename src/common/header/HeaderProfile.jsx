import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { logout } from '../../modules/auth/Auth.actions';
import { withTheme } from '../theme/Theme';
import { compose } from 'redux';
import { colors } from '../../../theme';
import { SideMenuService } from '../sideMenu/SideMenu.service';

export class HeaderProfile extends Component {
  onPress = async () => {
    if (!this.props.menuOpen) {
      SideMenuService.openMenu();
    } else {
      SideMenuService.closeMenu();
    }
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

const mapStateToProps = state => {
  return {
    menuOpen: state.sideMenu.open
  };
};

const mapDispatchToProps = {
  logout
};

export default compose(withTheme, connect(mapStateToProps, mapDispatchToProps))(HeaderProfile);
