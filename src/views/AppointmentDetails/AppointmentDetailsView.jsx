import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import AppointmentCard from '../../modules/appointments/components/AppointmentCard';
import { safeArea } from '../../styles/common.styles';
import MapView, { Marker } from 'react-native-maps';
import Typography from '../../common/typography/Typography';
import styles from './AppointmentDetailsView.styles';
import { RoundedButton } from '../../common/buttons/';
import { AntDesign, Entypo, EvilIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { RoundedIcon } from '../../common/icons';
import PropTypes from 'prop-types';
import AppointmentService from '../../services/appointment/Appointment.service';
import { colors } from '../../../theme';

class AppointmentDetailsView extends Component {
  handleSaveAppointment = async () => {
    const { appointment } = this.props.route.params;
    const saved = await AppointmentService.createAppointment({
      turn: appointment.turn._id,
      date: new Date()
    });
    if (saved) {
      this.props.navigation.navigate('Appointments');
    }
  };

  handleDeleteAppointment = async () => {
    const { appointment } = this.props.route.params;
    const data = await AppointmentService.deleteAppointment(appointment._id);
    if (data) {
      this.props.navigation.navigate('Appointments');
    }
  };

  render() {
    const { appointment } = this.props.route.params;
    const { loading } = this.props;
    return (
      appointment && (
        <View style={safeArea}>
          <ScrollView id="appointmentDetailContainer">
            <AppointmentCard appointment={appointment} />
            {appointment.turn.business.location && (
              <View style={{ borderRadius: 30, overflow: 'hidden', flex: 1 }}>
                <MapView
                  style={{ height: 200, padding: 20, margin: 5 }}
                  initialRegion={{
                    latitude: appointment.turn.business.location.coordinates[1] || 0,
                    longitude: appointment.turn.business.location.coordinates[0] || 0,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0022
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: appointment.turn.business.location.coordinates[1],
                      longitude: appointment.turn.business.location.coordinates[0]
                    }}
                    title={appointment.turn.business.name}
                    description={appointment.turn.business.address}
                  />
                </MapView>
              </View>
            )}

            <View style={styles.infoCard}>
              <View style={{ flex: 4 }}>
                <Typography size="small">Como llegar</Typography>
                <Typography size="small" color="secondary">
                  {appointment.turn.business.address}
                </Typography>
                <Typography size="small" color="secondary">
                  {appointment.turn.business.city}
                </Typography>
              </View>
              <View style={{ flex: 1 }}>
                <RoundedIcon size={40}>
                  <Entypo name="direction" size={20} color="white" />
                </RoundedIcon>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={{ flex: 4 }}>
                <Typography size="small">Email</Typography>
                <Typography size="small" color="secondary">
                  {appointment.turn.business.email}
                </Typography>
              </View>
              <View style={{ flex: 1 }}>
                <RoundedIcon size={40}>
                  <AntDesign name="mail" size={20} color="white" />
                </RoundedIcon>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            {appointment._id ? (
              <>
                <RoundedButton
                  label={'CAMBIAR TURNO'}
                  startIcon={<MaterialCommunityIcons name="alarm" size={20} color="white" />}
                  textStyle={{
                    fontSize: 14
                  }}
                />
                <TouchableOpacity onPress={this.handleDeleteAppointment}>
                  <RoundedIcon bkColor="white" shadow={true} size={60}>
                    <FontAwesome5 name="trash-alt" size={20} color="black" />
                  </RoundedIcon>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <RoundedButton
                  isLoading={loading}
                  buttonStyle={{
                    backgroundColor: '#33c483'
                  }}
                  onPress={this.handleSaveAppointment}
                  label={'CONFIRMAR'}
                  startIcon={!loading ? <MaterialCommunityIcons name="alarm" size={20} color="white" /> : null}
                  textStyle={{
                    fontSize: 14,
                    color: 'white'
                  }}
                />
                <RoundedButton
                  buttonStyle={{
                    backgroundColor: 'white'
                  }}
                  label={'CANCELAR'}
                  onPress={() => this.props.navigation.goBack()}
                  startIcon={<EvilIcons name="close" size={20} color={colors.text} />}
                  textStyle={{
                    fontSize: 14,
                    color: colors.text
                  }}
                />
              </>
            )}
          </View>
        </View>
      )
    );
  }
}

AppointmentDetailsView.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object.isRequired
  })
};
const mapStateToProps = state => ({
  loading: state.appointment.loading
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetailsView);
