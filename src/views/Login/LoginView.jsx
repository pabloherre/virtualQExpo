import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from '../../common/inputs/TextInput/TextInput';
import { AsyncStorage, View, Text, TouchableOpacity } from 'react-native';
import RoundedButton from '../../common/buttons/RoundedButton/RoundedButton';
import { setUser } from '../../modules/auth/Auth.actions';
import styles from './LoginView.styles';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (value, field) => {
    this.setState({ [field]: value });
  };

  handleLogin = async () => {
    await AsyncStorage.setItem('user', JSON.stringify(this.state));
    this.props.setUser(this.state);
    this.props.navigation.navigate('Appointments');
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <TextInput value={email} onChangeText={text => this.handleChange(text, 'email')} label="Email" />
        <TextInput value={password} secureTextEntry onChangeText={text => this.handleChange(text, 'password')} label="Password" />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text>Dont have an account, register here</Text>
        </TouchableOpacity>
        <RoundedButton label="Login" onPress={this.handleLogin} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
