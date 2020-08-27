import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Text } from 'react-native';
import { setUser } from '../Auth.actions';

export default function checkAuthentication(WrappedComponent) {
  class IsAuthenticated extends Component {
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      if (!this.props.isLoggedIn) {
        let data = await AsyncStorage.getItem('user');
        if (data) {
          this.props.setUser(JSON.parse(data));
        } else {
          this.props.navigation.navigate('Login');
        }
      }
    }

    render() {
      return this.props.isLoggedIn ? <WrappedComponent {...this.props} /> : <Text>Loading...</Text>;
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

  const mapDispatchToProps = {
    setUser
  };

  return connect(mapStateToProps, mapDispatchToProps)(IsAuthenticated);
}
