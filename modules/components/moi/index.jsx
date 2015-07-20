import React, { Component, PropTypes } from 'react';
import {Spring} from 'react-motion';
import {range} from 'd3';
import autobind from 'autobind-decorator';

var once = 0;

const style = {
  width: '100px',
  height: '100px',
  position: 'absolute',
  left: 0,
  top: 0
};

const onMouseMove = Symbol();

class Moi extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {mouse: {top: 0, left: 0}};
    this.getValues = this.getValues.bind(this);
    // this.setState  = this.setState.bind(this);
    this[onMouseMove] = this[onMouseMove].bind(this);
  }

  getValues(currentPositions) {
    return {val: this.state.mouse};
  }

  [onMouseMove]({pageX, pageY}) {
    this.setState({mouse: {top: pageX, left: pageY}});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const {circular, counter} = this.props;
    return (
      <div className="container"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "cyan"
        }}
        onMouseMove={this[onMouseMove]}
        onClick={circular}
      >
        <Spring
          endValue={this.getValues}
        >
          {({val}) => {
            return (<img style={{...style, ...val}} src={`./img/face-${counter.get('counter')}.jpg`} width={"100%"} />)
          }}
        </Spring>
      </div>
    );
  }

}

export default Moi
