/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../app/screens/Home';
import { Provider } from 'react-redux';
import store from '../app/store';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });
describe('test home page', () => {
  it('renders the component correctly', () => {
    renderer.create(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )
  })
})
