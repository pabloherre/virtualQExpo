import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RoundedButton } from '../../common/buttons';
import { TextInput } from '../../common/inputs';
import { AsyncStorage, Button, Image, View } from 'react-native';
import styles from './RegisterView.styles';
import { setUser } from '../../modules/auth/Auth.actions';

import logo from '../../../assets/images/logo1.jpg';

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  handleChange = (value, field) => {
    this.setState({ [field]: value });
  };

  handleRegister = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(this.state));
      this.props.setUser(this.state);
      this.props.navigation.navigate('Appointments');
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { name, lastName, email, password } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Image source={logo} />
        </View>
        <View style={styles.form}>
          <TextInput value={name} onChangeText={text => this.handleChange(text, 'name')} label="Nombre" />
          <TextInput value={lastName} onChangeText={text => this.handleChange(text, 'lastName')} label="Apellido" />
          <TextInput value={email} onChangeText={text => this.handleChange(text, 'email')} label="Email" />
          <TextInput value={password} secureTextEntry onChangeText={text => this.handleChange(text, 'password')} label="Password" />
          <RoundedButton label="REGISTRARME" onPress={this.handleRegister} />
        </View>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Appointments');
          }}
          title={'Appointments'}
        />
      </View>
    );
  }
}

const mapDispatchToProps = {
  setUser
};

export default connect(null, mapDispatchToProps)(RegisterView);