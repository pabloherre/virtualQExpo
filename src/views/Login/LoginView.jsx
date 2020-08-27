import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from '../../common/inputs/TextInput/TextInput';
import { Image, TouchableOpacity, View } from 'react-native';
import RoundedButton from '../../common/buttons/RoundedButton/RoundedButton';
import { setUser } from '../../modules/auth/Auth.actions';
import { safeArea } from '../../styles/common.styles';
import Typography from '../../common/typography/Typography';
import logo from '../../../assets/images/logo1.jpg';
import AuthService from '../../modules/auth/Auth.service';
import UserService from '../../services/user/User.service';

export class LoginView extends Component {
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
    const user = await AuthService.login(this.state);
    if (user) {
      await UserService.setUser(user);
      this.props.navigation.navigate('Appointments');
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={safeArea}>
        <View style={{ marginTop: 100 }}>
          <Image source={logo} style={{ alignSelf: 'center', marginVertical: 20 }} />
          <TextInput value={email} onChangeText={text => this.handleChange(text, 'email')} label="Email" />
          <TextInput value={password} secureTextEntry onChangeText={text => this.handleChange(text, 'password')} label="Password" />
          <View style={{ marginVertical: 20 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
              <Typography>
                Dont have an account, register <Typography color="secondary">here</Typography>
              </Typography>
            </TouchableOpacity>
          </View>
          <RoundedButton label="Login" onPress={this.handleLogin} />
        </View>
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
