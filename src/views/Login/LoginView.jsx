import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from '../../common/inputs/TextInput/TextInput';
import { AsyncStorage, SafeAreaView, Text, Image, TouchableOpacity, View } from 'react-native';
import RoundedButton from '../../common/buttons/RoundedButton/RoundedButton';
import { setUser } from '../../modules/auth/Auth.actions';
import { safeArea } from '../../styles/common.styles';
import Typography from '../../common/typography/Typography';
import logo from '../../../assets/images/logo1.jpg';

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
      <SafeAreaView style={safeArea}>
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
      </SafeAreaView>
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
