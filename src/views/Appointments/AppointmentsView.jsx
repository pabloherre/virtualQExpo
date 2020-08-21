import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, FlatList, SafeAreaView, View } from 'react-native';
import styles from './AppointmentsView.styles';
import AppointmentCard from '../../modules/appointments/components/AppointmentCard';
import RoundedButton from '../../common/buttons/RoundedButton/RoundedButton';
import { compose } from 'redux';
import checkAuthentication from '../../modules/auth/components/CheckAuthentication';
import { logout } from '../../modules/auth/Auth.actions';
import { safeArea } from '../../styles/common.styles';

class AppointmentsView extends Component {
  constructor(props) {
    super(props);
  }
  handleOnPressCard = appointment => {
    this.props.navigation.navigate('AppointmentDetails', { appointment });
  };

  render() {
    const { appointments } = this.props;
    return (
      <SafeAreaView style={safeArea}>
        <FlatList
          data={appointments}
          renderItem={({ item }) => <AppointmentCard appointment={item} onPressCard={appointment => this.handleOnPressCard(appointment)} />}
          keyExtractor={item => item.id.toString()}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.addButton}>
            <RoundedButton label="+" />
          </View>
          <RoundedButton
            label="Logout"
            onPress={async () => {
              this.props.logout();
              await AsyncStorage.removeItem('user');
              this.props.navigation.navigate('Login');
            }}
          />
        </View>
      </SafeAreaView>
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
