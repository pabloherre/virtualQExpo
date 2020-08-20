import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import styles from './AppointmentDetailsView.styles';
import AppointmentCard from '../../modules/appointments/components/AppointmentCard';

class AppointmentDetailsView extends Component {
  render() {
    const { appointment } = this.props;
    return (
      <>
        <SafeAreaView style={styles.container}>
          <AppointmentCard appointment={appointment} />
        </SafeAreaView>
      </>
    );
  }
}

AppointmentDetailsView.propTypes = {
  appointment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(null, null)(AppointmentDetailsView);
