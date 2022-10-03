/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../app/store';
import ProductListScreen from '../app/screens/ProductList';

test('render product list page', () => {
    const tree = renderer.create(<Provider store={store}>
        <ProductListScreen />
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
})
