import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RoundedButton } from '../../common/buttons';
import { TextInput } from '../../common/inputs';
import { Image, View } from 'react-native';

import logo from '../../../assets/images/logo.png';
import { safeArea } from '../../styles/common.styles';
import UserService from '../../services/user/User.service';
import { compose } from 'redux';
import withBackground from '../../common/background/Background';
import { setTestInfo } from '../../utils/test.utils';

export class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  handleChange = (value, field) => {
    this.setState({ [field]: value });
  };

  handleRegister = async () => {
    const user = await UserService.registerUser(Object.assign({}, this.state));

    if (user) {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <View style={safeArea}>
        <View style={{ marginTop: 80 }}>
          <Image source={logo} style={{ alignSelf: 'center', marginTop: 10, marginBottom: 40, width: 350, resizeMode: 'contain' }} />
          <View style={{ marginBottom: 20 }}>
            <TextInput
              value={firstName}
              onChangeText={text => this.handleChange(text, 'firstName')}
              label="Nombre"
              {...setTestInfo('testInputRegisterName')}
            />
            <TextInput
              value={lastName}
              onChangeText={text => this.handleChange(text, 'lastName')}
              label="Apellido"
              {...setTestInfo('testInputRegisterLastName')}
            />
            <TextInput
              value={email}
              onChangeText={text => this.handleChange(text, 'email')}
              label="Email"
              {...setTestInfo('testInputRegisterEmail')}
            />
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={text => this.handleChange(text, 'password')}
              label="Password"
              {...setTestInfo('testInputRegisterPassword')}
            />
          </View>
          <RoundedButton
            label="REGISTRARME"
            onPress={this.handleRegister}
            isLoading={this.props.loading}
            {...setTestInfo('testTouchableRegisterButton')}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.user.loading
  };
}

export default compose(withBackground, connect(mapStateToProps, null))(RegisterView);
