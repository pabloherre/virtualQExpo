import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextInput from '../../common/inputs/TextInput/TextInput';
import { Image, TouchableOpacity, View } from 'react-native';
import RoundedButton from '../../common/buttons/RoundedButton/RoundedButton';
import { setUser } from '../../modules/auth/Auth.actions';
import { safeArea } from '../../styles/common.styles';
import Typography from '../../common/typography/Typography';
import logo from '../../../assets/images/logo.png';

import AuthService from '../../modules/auth/Auth.service';
import UserService from '../../services/user/User.service';
import { showMessage } from 'react-native-flash-message';
import withBackground from '../../common/background/Background';

export class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  async componentDidMount() {
    const user = await AuthService.reAuthenticate();
    if (user) {
      UserService.setUser(user);
      this.props.navigation.navigate('Appointments');
    }
  }

  handleChange = (value, field) => {
    this.setState({ [field]: value });
  };

  handleLogin = async () => {
    try {
      const user = await AuthService.login(this.state);
      if (user) {
        await UserService.setUser(user);
        this.props.navigation.navigate('Appointments');
      }
    } catch (e) {
      showMessage({
        message: 'Login Failed',
        description: e.message,
        type: 'danger',
        icon: 'danger'
      });
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={safeArea}>
        <View style={{ marginTop: 80 }}>
          <Image source={logo} style={{ alignSelf: 'center', marginTop: 10, marginBottom: 40, width: 350, resizeMode: 'contain' }} />
          <TextInput value={email} onChangeText={text => this.handleChange(text, 'email')} label="Email" />
          <TextInput value={password} secureTextEntry onChangeText={text => this.handleChange(text, 'password')} label="Password" />
          <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
              <Typography>
                Don't have an account?, register <Typography color="secondary">here!</Typography>
              </Typography>
            </TouchableOpacity>
          </View>
          <RoundedButton label="Login" onPress={this.handleLogin} isLoading={this.props.loading} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.auth.loading
  };
}

const mapDispatchToProps = {
  setUser
};

export default compose(withBackground, connect(mapStateToProps, mapDispatchToProps))(LoginView);
