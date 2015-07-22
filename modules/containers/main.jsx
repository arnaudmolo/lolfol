import React, { Component } from 'react';
import { createRedux } from 'redux';
import MoiApp from './moi-app';

import { Provider } from 'redux/react';
import * as stores from '../stores';

const redux = createRedux(stores);

console.log(stores);

export default class App extends Component {
  render() {
    return (
      <Provider redux={redux}>
        {() => <MoiApp />}
      </Provider>
    );
  }
}
