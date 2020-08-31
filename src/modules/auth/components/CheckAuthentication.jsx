import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import UserService from '../../../services/user/User.service';

export default function checkAuthentication(WrappedComponent) {
  class IsAuthenticated extends Component {
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      if (!this.props.isLoggedIn) {
        let data = await AsyncStorage.getItem('user');

        if (data) {
          AuthService.login();
          UserService.setUser(data);
        } else {
          this.props.navigation.navigate('Login');
        }
      }
    }

    render() {
      return this.props.isLoggedIn ? <WrappedComponent {...this.props} /> : <></>;
    }
  }

  IsAuthenticated.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
  };

  function mapStateToProps(state) {
    return {
      isLoggedIn: state.auth.isLoggedIn
    };
  }

  return connect(mapStateToProps, null)(IsAuthenticated);
}
