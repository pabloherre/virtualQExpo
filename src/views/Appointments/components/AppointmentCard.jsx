import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './AppointmentCard.styles';
import Typography from '../../../common/typography/Typography';

class AppointmentCard extends Component {
  render() {
    const { appointment } = this.props;
    return (
      <TouchableOpacity style={styles.card}>
        <View>
          <Typography size="small" color="primary">
            {appointment.date}
          </Typography>
          <Typography textStyles={{ fontWeight: 'bold' }}>{appointment.business}</Typography>
        </View>

        <View>
          <Text>&nbsp;</Text>
          <Typography size="small">Your #</Typography>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography size="large" color="secondary">
              {appointment.appointmentNumber}
            </Typography>
            <Typography size="large">&#62;</Typography>
            <Typography size="large" color="primary">
              {appointment.appointmentCountdown}
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
  appointment: PropTypes.shape({
    appointmentNumber: PropTypes.string.isRequired,
    business: PropTypes.string.isRequired,
    appointmentCountdown: PropTypes.number,
    date: PropTypes.date
  })
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AppointmentCard);
