import PropTypes from 'prop-types';

const BusinessDefinition = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string,
  address: PropTypes.string.isRequired,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
}

const TurnDefinition = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['ACTIVE', 'FINALIZED', 'PAUSED']),
  business: PropTypes.instanceOf(BusinessDefinition),
  currentTurn: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired
};

const AppointmentDefinition = {
  turn: PropTypes.instanceOf(TurnDefinition),
  date: PropTypes.instanceOf(Date),
  number: PropTypes.number,
  status: PropTypes.oneOf(['ACTIVE', 'CANCELLED'])
};

export { TurnDefinition, AppointmentDefinition };
