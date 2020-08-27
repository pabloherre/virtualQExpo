import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);
function connectedRender(ui, initialState) {
  const store = mockStore(initialState);
  return renderer.create(<Provider store={store}>{ui}</Provider>);
}

function connectedShallow(ui, initialState) {
  const store = mockStore(initialState);
  return shallow(<Provider store={store}>{ui}</Provider>);
}

function connectedMount(ui, initialState, numberOfHoc) {
  const store = mockStore(initialState);
  return mount(<Provider store={store}>{ui}</Provider>);
}

// override connectedRender method
export { connectedRender, connectedShallow, connectedMount };
