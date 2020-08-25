import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import styles from './AppointmentsView.styles';
import AppointmentCard from '../../modules/appointments/components/AppointmentCard';
import { compose } from 'redux';
import checkAuthentication from '../../modules/auth/components/CheckAuthentication';
import { safeArea } from '../../styles/common.styles';
import { Entypo } from '@expo/vector-icons';
import RoundedIcon from '../../common/icons/RoundedIcon';
import { useTheme } from '@react-navigation/native';
import { withTheme } from '../../common/theme/Theme';

class AppointmentsView extends Component {
  constructor(props) {
    super(props);
  }
  handleOnPressCard = appointment => {
    this.props.navigation.navigate('AppointmentDetails', { appointment });
  };

  render() {
    const { appointments } = this.props;

    const {
      theme: { colors }
    } = this.props;
    return (
      <SafeAreaView style={safeArea}>
        <FlatList
          data={appointments}
          renderItem={({ item }) => <AppointmentCard appointment={item} onPressCard={appointment => this.handleOnPressCard(appointment)} />}
          keyExtractor={item => item.id.toString()}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.addButton}>
            <RoundedIcon size={64} bkColor={colors.primary} shadow={true}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AppointmentNew')}>
                <Entypo name="plus" size={36} color="white" />
              </TouchableOpacity>
            </RoundedIcon>
          </View>
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

export default compose(withTheme, checkAuthentication, connect(mapStateToProps, null))(AppointmentsView);
