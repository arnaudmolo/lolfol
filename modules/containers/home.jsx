import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'redux/react';

import * as HomeActions from './../actions/home-actions';

import GeneratedImage from './../components/generated-image/generated-image';

export default class Home extends Component {

  componentDidMount() {
    addEventListener('resize', () => {
      this.forceUpdate()
    })
  }

  render() {
    return (
      <div>
        <GeneratedImage style={{position: 'absolute', left: 0, top: 0}} src={`/img/face-0.jpg`} width={innerWidth} height={innerHeight} />
      </div>
    );
  }
}
