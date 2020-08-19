const INITIAL_STATE = {
  appointments: [
    {
      id: 1,
      date: 'Today',
      business: 'Pharmacy',
      appointmentNumber: '234234',
      appointmentCountdown: 23
    },
    {
      id: 2,
      date: 'Today',
      business: 'Supermarket',
      appointmentNumber: '2B4354',
      appointmentCountdown: 322
    },
    {
      id: 3,
      date: 'Tomorrow',
      business: 'Cinema',
      appointmentNumber: '234354',
      appointmentCountdown: 322
    },
    {
      id: 4,
      date: 'Tomorrow',
      business: 'Pool',
      appointmentNumber: '234354',
      appointmentCountdown: 322
    }
  ]
};

export default function appointmentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
