import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import styles from './AppointmentsView.styles';
import AppointmentCard from '../../modules/appointments/components/AppointmentCard';
import { compose } from 'redux';
import checkAuthentication from '../../modules/auth/components/CheckAuthentication';
import { safeArea } from '../../styles/common.styles';
import { Entypo } from '@expo/vector-icons';
import RoundedIcon from '../../common/icons/RoundedIcon';
import { colors } from '../../../theme';
import { AppointmentDefinition } from '../../modules/appointments/appointments.definitions';
import AppointmentService from '../../services/appointment/Appointment.service';
import { setTestInfo } from '../../utils/test.utils';

export class AppointmentsView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AppointmentService.findAppointments();
  }

  handleOnPressCard = appointment => {
    this.props.navigation.navigate('AppointmentDetails', { appointment });
  };

  render() {
    const { appointments, isLoading } = this.props;

    return (
      <View style={safeArea}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={appointments}
            {...setTestInfo('testListAppointmentsList')}
            renderItem={({ item }) => (
              <AppointmentCard
                appointment={item}
                onPressCard={appointment => this.handleOnPressCard(appointment)}
                {...setTestInfo('testTouchableAppointmentCard')}
              />
            )}
            keyExtractor={item => item._id}
          />
        )}
        <View style={styles.buttonContainer}>
          <View style={styles.addButton}>
            <RoundedIcon size={64} bkColor={colors.primary} shadow={true}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AppointmentNew')}
                {...setTestInfo('testTouchableNewAppointmentButton')}
              >
                <Entypo name="plus" size={36} color="white" />
              </TouchableOpacity>
            </RoundedIcon>
          </View>
        </View>
      </View>
    );
  }
}

AppointmentsView.propTypes = {
  colors: PropTypes.shape({
    primary: PropTypes.string
  }),
  appointments: PropTypes.arrayOf(PropTypes.shape(AppointmentDefinition))
};

AppointmentsView.defaultProps = {
  colors: colors
};

const mapStateToProps = state => {
  return {
    appointments: state.appointment.data,
    isLoading: state.appointment.loading
  };
};

export default compose(checkAuthentication, connect(mapStateToProps, null))(AppointmentsView);
