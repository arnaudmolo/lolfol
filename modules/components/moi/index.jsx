import React, { Component, PropTypes } from 'react';

export default class Moi extends Component {

  static propTypes = {
    changeIndex: PropTypes.func.isRequired,
    face: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired
  }

  render() {
    const {circular, counter} = this.props;
    return (
      <img src={`./img/face-${counter.counter}.jpg`} width={300} onClick={circular} />
    );
  }

}
