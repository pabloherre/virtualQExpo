import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '../../common/typography/Typography';
import { safeArea } from '../../styles/common.styles';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { RoundedButton } from '../../common/buttons';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { colors } from '../../../theme';

export class AppointmentNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
      searchValue: '',
      hasPermissions: false
    };
  }

  async componentDidMount() {
    let { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      this.setState({ currentLocation: location });
    }
  }

  handleCode = () => {
    // this.props.navigation.navigate('AppointmentDetails', { appointment:  }); // TODO: reserve appointment for this business
  };

  render() {
    const { hasPermissions, searchValue, currentLocation } = this.state;
    return (
      <View style={safeArea}>
        <Typography>Type the store code or scan the QR code</Typography>

        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 2,
              alignItems: 'center',
              borderColor: 'gray',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderRadius: 30,
              marginRight: 5,
              paddingHorizontal: 10
            }}
          >
            <TextInput style={{ flex: 8 }} value={searchValue} onChangeText={text => this.setState({ searchValue: text })} label="Code" />
            <TouchableOpacity id="searchCode" style={{ flex: 1 }} onPress={this.handleCode}>
              <AntDesign name="right" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <RoundedButton
            buttonStyle={{ flex: 1 }}
            label={'SCAN'}
            onPress={async () => {
              if (!hasPermissions) {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                if (status === 'granted') {
                  this.props.navigation.navigate('QRCode');
                }
              }
            }}
          />
        </View>

        <View
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            marginVertical: 20,
            borderStyle: 'dashed'
          }}
        />

        <Typography>You can also find stores near you</Typography>
        {currentLocation && (
          <View style={{ borderRadius: 30, overflow: 'hidden', flex: 1 }}>
            <MapView
              style={{ padding: 20, flex: 1 }}
              initialRegion={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              {this.props.business.map(business => {
                return (
                  <Marker
                    key={business.id}
                    onPress={this.handleCode}
                    coordinate={{ latitude: business.latitude, longitude: business.longitude }}
                    title={business.business}
                    description={business.business}
                  />
                );
              })}
            </MapView>
          </View>
        )}
      </View>
    );
  }
}

AppointmentNew.propTypes = {
  colors: PropTypes.shape({
    primary: PropTypes.string
  })
};

AppointmentNew.defaultProps = {
  colors: colors
};

function mapStateToProps(state) {
  return {
    // appointments: state.appointment.data
    business: [] // TODO: get from service.-
  };
}

export default connect(mapStateToProps)(AppointmentNew);
