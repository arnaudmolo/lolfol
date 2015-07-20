import React, { Component, PropTypes } from 'react';

const style = {
  width: '100px',
  height: '100px',
  position: 'absolute',
  left: 0,
  top: 0
};

export default class Moi extends Component {

  static propTypes = {
    changeIndex: PropTypes.func.isRequired,
    face: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired
  }

  render() {
    const {circular, counter} = this.props;
    return (
      <img style={style} src={`./img/face-${counter.get('counter')}.jpg`} width={"100%"} onClick={circular} />
    );
  }

}
