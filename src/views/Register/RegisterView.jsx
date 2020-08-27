import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RoundedButton } from '../../common/buttons';
import { TextInput } from '../../common/inputs';
import { Image, View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../../../assets/images/logo1.jpg';
import { safeArea } from '../../styles/common.styles';
import AuthService from '../../modules/auth/Auth.service';
import UserService from '../../services/user/User.service';

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
        <View style={{ marginTop: 100 }}>
          <Image source={logo} style={{ alignSelf: 'center' }} />
          <View style={{ marginBottom: 20 }}>
            <TextInput value={firstName} onChangeText={text => this.handleChange(text, 'firstName')} label="Nombre" />
            <TextInput value={lastName} onChangeText={text => this.handleChange(text, 'lastName')} label="Apellido" />
            <TextInput value={email} onChangeText={text => this.handleChange(text, 'email')} label="Email" />
            <TextInput value={password} secureTextEntry onChangeText={text => this.handleChange(text, 'password')} label="Password" />
          </View>
          <RoundedButton label="REGISTRARME" onPress={this.handleRegister} />
          <Button
            onPress={() => {
              this.props.navigation.navigate('Appointments');
            }}
            title={'Appointments'}
          />
        </View>
      </View>
    );
  }
}

export default RegisterView;
