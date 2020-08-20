import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);
function connectedRender(ui, initialState) {
  const store = mockStore(initialState);
  component = renderer.create(<Provider store={store}>{ui}</Provider>);
  return component;
}

// override connectedRender method
export { connectedRender };
