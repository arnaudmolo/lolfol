import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'redux/react';

import * as HomeActions from './../actions/home-actions';

import GeneratedImage from './../components/generated-image';

export default class Home extends Component {

  render() {
    return (
      <GeneratedImage src={`/img/background.jpeg`} />
    );
  }
}
