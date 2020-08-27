import React, { Component } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { withTheme } from '../theme/Theme';

class HeaderNotification extends Component {
  render() {
    const {
      theme: { colors }
    } = this.props;
    return <EvilIcons name="bell" size={36} color={colors.text} />;
  }
}

HeaderNotification.propTypes = {};

export default withTheme(HeaderNotification);
