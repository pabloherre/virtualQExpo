import React from 'react';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';
import { SideMenuService } from './SideMenu.service';
import { Animated, View } from 'react-native';
import { colors } from '../../../theme.js';

export default function withSideMenu(WrappedComponent, WrappedMenu) {
  class WithSideMenu extends React.Component {
    render() {
      return (
        <SideMenu
          isOpen={this.props.open}
          menu={<WrappedMenu {...this.props} />}
          disableGestures={true}
          animationFunction={(prop, value) =>
            Animated.spring(prop, {
              toValue: value,
              useNativeDriver: true
            })
          }
          onChange={isOpen => {
            if (!isOpen) {
              SideMenuService.closeMenu();
            }
          }}
        >
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <WrappedComponent {...this.props} />
          </View>
        </SideMenu>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      open: state.sideMenu.open
    };
  };

  return connect(mapStateToProps, null)(WithSideMenu);
}
