import React, { Component, PropTypes } from 'react';

export default class Moi extends Component {

  static propTypes = {
    changeIndex: PropTypes.func.isRequired,
    face: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired
  }

  render() {
    const {circular, counter} = this.props;

    const style = {
      // backgroundImage: `url(./img/face-${counter.get('counter')}.jpg)`,
      width: '100vw',
      height: '100vh',
    }

    return (
      <img style={style} src={`./img/face-${counter.get('counter')}.jpg`} width={"100%"} onClick={circular} />
    );
  }

}
