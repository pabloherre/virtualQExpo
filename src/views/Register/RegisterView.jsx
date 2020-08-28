import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RoundedButton } from '../../common/buttons';
import { TextInput } from '../../common/inputs';
import { Image, View } from 'react-native';

import logo from '../../../assets/images/logo1.jpg';
import { safeArea } from '../../styles/common.styles';
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
          <RoundedButton label="REGISTRARME" onPress={this.handleRegister} isLoading={this.props.loading} />
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

export default connect(mapStateToProps, null)(RegisterView);
