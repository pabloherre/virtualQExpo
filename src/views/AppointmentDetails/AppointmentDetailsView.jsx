import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SafeAreaView, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import styles from './AppointmentDetailsView.styles';
import AppointmentCard from '../../modules/appointments/components/AppointmentCard';

class AppointmentDetailsView extends Component {
  render() {
    const { appointment } = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View id="appointmentDetailContainer">
          {appointment && <AppointmentCard appointment={appointment} />}

          <MapView
            style={{ flex: 1, borderRadius: 10 }}
            initialRegion={{
              latitude: appointment.latitude,
              longitude: appointment.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <Marker
              coordinate={{ latitude: appointment.latitude, longitude: appointment.longitude }}
              title={appointment.business}
              description={appointment.business}
            />
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetailsView);
