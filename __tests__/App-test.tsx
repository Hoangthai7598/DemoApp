/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../app/screens/Home';
import { Provider } from 'react-redux';
import store from '../app/store';
import AddEditProductScreen from '../app/screens/AddEditProduct';
import ProductListScreen from '../app/screens/ProductList';

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

// describe('test home page', () => {
//   it('renders the component correctly', () => {
//     renderer.create(
//       <Provider store={store}>
//         <AddEditProductScreen />
//       </Provider>
//     )
//   })
// })

// describe('test home page', () => {
//   it('renders the component correctly', () => {
//     renderer.create(
//       <Provider store={store}>
//         <ProductListScreen />
//       </Provider>
//     )
//   })
// })
