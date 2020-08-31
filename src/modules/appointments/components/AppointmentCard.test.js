import React from 'react';
import { AppointmentCard } from './AppointmentCard';
import { shallow } from 'enzyme';
import { appointment } from '../../../../jest/mocks';

describe('<AppointmentCard />', () => {
  let wrapper;
  const onPressCard = jest.fn();

  beforeAll(() => {
    wrapper = shallow(<AppointmentCard appointment={appointment} onPressCard={onPressCard} />);
  });

  afterEach(() => {
    onPressCard.mockClear();
  });

  it('should render correctly', async () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have date', async () => {
    const el = wrapper.find("[testID='testDateAppointmentDate']");
    expect(el.childAt(0).text()).toBe(new Date('2020-01-01').toString());
  });

  it('should have business name', async () => {
    const el = wrapper.find("[testID='testTextAppointmentBusiness']");
    expect(el.childAt(0).text()).toBe('Business Name');
  });

  it('should have number', async () => {
    const el = wrapper.find("[testID='testTextAppointmentNumber']");
    expect(el.childAt(0).text()).toBe('5');
  });

  it('should have {n} numbers ahead', async () => {
    const el = wrapper.find("[testID='testTextAppointmentNumberAhead']");
    expect(el.childAt(0).text()).toBe('4');
  });

  it('should call function on touch', async () => {
    const el = wrapper.find("[testID='testTouchableAppointmentCard']");
    el.simulate('press');
    expect(onPressCard).toHaveBeenCalled();
  });
});
