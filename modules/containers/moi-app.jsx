import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'redux/react';
import Moi from './../components/moi';

import * as MoiActions from './../actions/moi-actions';

@connect(function(state) {
  return {
    counter: state.counter,
    increasing: state.increasing
  }
})
export default class MoiApp extends Component {
  render() {
    const {counter, increasing, dispatch} = this.props;
    return (
      <Moi counter={counter} {...bindActionCreators(MoiActions, dispatch)} />
    );
  }
}
