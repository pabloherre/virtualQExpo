import React, { Component } from 'react';
import { EvilIcons } from '@expo/vector-icons';

class HeaderNotification extends Component {
  render() {
    return <EvilIcons name="bell" size={36} color="#a1a2a4" />;
  }
}

HeaderNotification.propTypes = {};

export default HeaderNotification;
