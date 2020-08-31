import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserService from '../../../services/user/User.service';
import AuthService from '../Auth.service';

export default function checkAuthentication(WrappedComponent) {
  class IsAuthenticated extends Component {
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      if (!this.props.isLoggedIn) {
        const user = await AuthService.reAuthenticate();
        if (user) {
          UserService.setUser(user);
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
