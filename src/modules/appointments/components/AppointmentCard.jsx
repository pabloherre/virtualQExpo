import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './AppointmentCard.styles';
import Typography from '../../../common/typography/Typography';
import { AntDesign } from '@expo/vector-icons';
import { withTheme } from '../../../common/theme/Theme';
import { compose } from 'redux';
import { AppointmentDefinition } from '../appointments.definitions';
import { colors } from '../../../../theme';
import { setTestInfo } from '../../../utils/test.utils';

export class AppointmentCard extends Component {
  render() {
    const { appointment, onPressCard } = this.props;
    return (
      <TouchableOpacity style={styles.card} onPress={() => onPressCard && onPressCard(appointment)} {...setTestInfo('testTouchableAppointmentCard')}>
        <View>
          <Typography size="small" color="primary" {...setTestInfo('testDateAppointmentDate')}>
            {appointment.date.toString()}
          </Typography>
          <Typography {...setTestInfo('testTextAppointmentBusiness')} textStyles={{ fontWeight: 'bold' }}>
            {appointment.turn.business.name}
          </Typography>
        </View>

        <View>
          <Text>&nbsp;</Text>
          <Typography size="small">Your #</Typography>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography size="large" color="secondary" {...setTestInfo('testTextAppointmentNumber')}>
              {appointment.number}
            </Typography>
            <AntDesign name="right" size={24} color={colors.text} />
            <Typography size="large" color="primary" {...setTestInfo('testTextAppointmentNumberAhead')}>
              {appointment.number - appointment.turn.currentTurn}
            </Typography>
            <Typography size="small" textStyles={{ width: 60 }}>
              Numbers ahead
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

AppointmentCard.propTypes = {
  appointment: PropTypes.shape(AppointmentDefinition).isRequired
};

function mapStateToProps(state) {
  return {};
}

export default compose(withTheme, connect(mapStateToProps))(AppointmentCard);
