/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../app/screens/Home';
import { Provider } from 'react-redux';
import store from '../app/store';

test('render home page', () => {
    const tree = renderer.create(<Provider store={store}>
        <HomeScreen />
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
})
