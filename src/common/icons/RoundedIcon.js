import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './RoundedIcon.styles';
import PropTypes from 'prop-types';

class RoundedIcon extends Component {
  getShadowStyles = () => {
    return this.props.shadow ? styles.shadow : {};
  };

  getButtonIconSize = () => {
    return {
      width: this.props.size,
      height: this.props.size,
      borderRadius: this.props.size / 2
    };
  };

  render() {
    const { bkColor, children } = this.props;
    return <View style={{ ...styles.container, backgroundColor: bkColor, ...this.getButtonIconSize(), ...this.getShadowStyles() }}>{children}</View>;
  }
}

RoundedIcon.defaultProps = {
  bkColor: '#0db4e4',
  shadow: false,
  size: 50
};

RoundedIcon.propTypes = {
  bkColor: PropTypes.string,
  shadow: PropTypes.bool,
  size: PropTypes.number
};

export default RoundedIcon;
