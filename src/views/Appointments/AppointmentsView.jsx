import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, FlatList, SafeAreaView, View, Text } from 'react-native';
import styles from './AppointmentsView.styles';
import AppointmentCard from './components/AppointmentCard';
import RoundedButton from '../../common/buttons/RoundedButton/RoundedButton';
import { compose } from 'redux';
import checkAuthentication from '../../modules/auth/components/CheckAuthentication';
import { logout, setUser } from '../../modules/auth/Auth.actions';

class AppointmentsView extends Component {
  constructor(props) {
    super(props);
  }
  handleOnPressCard = appointment => {
    this.props.navigation.navigate('AppointmentDetails', appointment);
  };

  render() {
    const { appointments } = this.props;
    return (
      <>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={appointments}
            renderItem={({ item }) => <AppointmentCard appointment={item} onPressCard={appointment => this.handleOnPressCard(appointment)} />}
            keyExtractor={item => item.id.toString()}
          />
        </SafeAreaView>
        <RoundedButton
          label="Clear storage"
          onPress={async () => {
            this.props.logout();
            await AsyncStorage.removeItem('user');
            this.props.navigation.navigate('Login');
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.addButton}>
            <RoundedButton label="+" />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    appointments: state.appointment.appointments
  };
};

const mapDispatchToProps = {
  logout
};

export default compose(checkAuthentication, connect(mapStateToProps, mapDispatchToProps))(AppointmentsView);
