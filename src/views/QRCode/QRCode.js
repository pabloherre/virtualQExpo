import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

class QRCodeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermissions: false
    };
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.props.navigation.navigate('AppointmentDetails', { appointment: this.props.appointments[0] }); // TODO: reserve appointment for this business
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <BarCodeScanner onBarCodeScanned={this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    appointments: state.appointment.appointments
  };
};

export default connect(mapStateToProps)(QRCodeView);
