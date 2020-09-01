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
import debounce from '@react-navigation/stack/src/utils/debounce';
import TurnService from '../../services/turn/Turn.service';
import { showMessage } from 'react-native-flash-message';

export class AppointmentNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      searchValue: '',
      hasPermissions: false,
      business: []
    };
  }

  async componentDidMount() {
    let { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude }, () =>
        this.findTurnsByRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922 })
      );
    }
  }

  getBusinessByTurns = () => {
    return this.props.turns.reduce((acc, turn) => {
      return acc.concat(turn.business);
    }, []);
  };

  handleCode = async code => {
    const turn = await TurnService.findBusinessByCode(code);
    if (!turn) {
      showMessage({
        message: 'Invalid code',
        description: 'Business not found',
        type: 'danger',
        icon: 'danger'
      });
    } else {
      const appointment = {
        turn,
        date: Date.now().toString()
      };
      this.props.navigation.navigate('AppointmentDetails', { appointment });
    }
  };

  findTurnsByRegion = async region => {
    const { latitude, longitude } = this.state;

    TurnService.findNearTurns({
      latitude,
      longitude,
      delta: region.latitudeDelta
    });
  };

  handleChangeRegion = newRegion => {
    this.debouncedHandleChangeRegion(newRegion);
  };

  debouncedHandleChangeRegion = debounce(newRegion => {
    this.setState({ latitude: newRegion.latitude, longitude: newRegion.longitude }, () => this.findTurnsByRegion(newRegion));
  }, 1000);

  render() {
    const { hasPermissions, searchValue, latitude, longitude } = this.state;
    return (
      <View style={safeArea}>
        <Typography>Type the store code or scan the QR code</Typography>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 2,
              alignItems: 'center',
              borderColor: colors.border,
              justifyContent: 'space-between',
              borderWidth: 1,
              borderRadius: 30,
              marginRight: 5,
              paddingHorizontal: 10
            }}
          >
            <TextInput style={{ flex: 8 }} value={searchValue} onChangeText={text => this.setState({ searchValue: text })} label="Code" />
            <TouchableOpacity id="searchCode" style={{ flex: 1 }} onPress={() => this.handleCode(searchValue)}>
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

        <View
          style={{ borderRadius: 30, overflow: 'hidden', flex: 1, marginTop: 20, borderColor: colors.border, borderWidth: Boolean(latitude) ? 0 : 1 }}
        >
          {Boolean(latitude) && Boolean(longitude) && (
            <MapView
              style={{ padding: 20, flex: 1 }}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              onRegionChange={reg => this.handleChangeRegion(reg)}
            >
              {this.getBusinessByTurns().map(business => {
                return (
                  <Marker
                    key={business._id}
                    onCalloutPress={() => {
                      this.handleCode(business.code);
                    }}
                    coordinate={{
                      latitude: business.location.coordinates[1],
                      longitude: business.location.coordinates[0]
                    }}
                    title={business.name}
                    description={business.address}
                  />
                );
              })}
            </MapView>
          )}
        </View>
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
    turns: state.turn.data
  };
}

export default connect(mapStateToProps)(AppointmentNew);
