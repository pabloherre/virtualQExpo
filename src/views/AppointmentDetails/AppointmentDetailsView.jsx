import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ScrollView, View } from 'react-native';
import AppointmentCard from '../../modules/appointments/components/AppointmentCard';
import { safeArea } from '../../styles/common.styles';
import MapView, { Marker } from 'react-native-maps';
import Typography from '../../common/typography/Typography';
import styles from './AppointmentDetailsView.styles';
import { RoundedButton } from '../../common/buttons/';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { RoundedIcon } from '../../common/icons';
import PropTypes from 'prop-types';

class AppointmentDetailsView extends Component {
  render() {
    const { appointment } = this.props.route.params;
    return (
      <SafeAreaView style={safeArea}>
        {appointment && (
          <ScrollView id="appointmentDetailContainer">
            <AppointmentCard appointment={appointment} />

            <MapView
              style={{ height: 200, padding: 20, margin: 5 }}
              initialRegion={{
                latitude: appointment.latitude || 0,
                longitude: appointment.longitude || 0,
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

            <View style={styles.infoCard}>
              <View style={{ flex: 4 }}>
                <Typography size="small">Como llegar</Typography>
                <Typography size="small" color="secondary">
                  {appointment.address}
                </Typography>
                <Typography size="small" color="secondary">
                  {appointment.city}
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
                  {appointment.email}
                </Typography>
              </View>
              <View style={{ flex: 1 }}>
                <RoundedIcon size={40}>
                  <AntDesign name="mail" size={20} color="white" />
                </RoundedIcon>
              </View>
            </View>
          </ScrollView>
        )}

        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <RoundedButton
            label={'CAMBIAR TURNO'}
            startIcon={<MaterialCommunityIcons name="alarm" size={20} color="white" />}
            textStyle={{
              fontSize: 14
            }}
          />
          <RoundedIcon bkColor="white" shadow={true} size={60}>
            <FontAwesome5 name="trash-alt" size={20} color="black" />
          </RoundedIcon>
        </View>
      </SafeAreaView>
    );
  }
}

AppointmentDetailsView.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object.isRequired
  })
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetailsView);
