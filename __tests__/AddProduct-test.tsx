/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../app/store';
import AddEditProductScreen from '../app/screens/AddEditProduct';

test('render add product list page', () => {
    const tree = renderer.create(<Provider store={store}>
        <AddEditProductScreen />
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
})
