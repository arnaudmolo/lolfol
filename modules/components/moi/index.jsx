import React, { Component, PropTypes } from 'react';
import {Spring} from 'react-motion';
import {range} from 'd3';
import autobind from 'autobind-decorator';

import Circle from './../canvas/circle';
import Bezier from './../canvas/bezier';

import {Surface, Image, Text, Group} from 'react-canvas';

const style = {
  width: 300,
  height: 150,
  position: 'absolute',
  x: 0,
  y: 0
};

const onMouseMove = Symbol();

class Moi extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {mouse: {y: 0, x: 0}};
    this.getValues = this.getValues.bind(this);
    this[onMouseMove] = this[onMouseMove].bind(this);
  }

  getValues(currentPositions) {
    return {val: this.state.mouse};
  }

  [onMouseMove]({pageX, pageY}) {
    this.setState({mouse: {y: pageY, x: pageX}});
  }

  render() {
    const {circular, counter} = this.props;
    return (
      <div className="container"
        style={{
          width: innerWidth,
          height: 1000,
          backgroundColor: "black"
        }}
        onMouseMove={this[onMouseMove]}
        onClick={circular}
      >
        <Surface width={innerWidth} height={1000} x={0} y={0}>
          <Spring endValue={this.getValues}>
            {(rest) => {
              const {val} = rest;
              let x = val.x;
              let mirroredX = x;
              if (-x <= 0) {
                mirroredX = -x + innerWidth
              }
              const mirroredVal = {x: mirroredX, y: val.y}
              return (
                <Group>
                  <Circle style={{...style, ...val}} />
                  <Bezier style={{start: val, end: mirroredVal}} />
                  <Circle style={{...style, ...mirroredVal}} />
                </Group>
              )
            }}
          </Spring>
        </Surface>
      </div>
    );
  }

}

export default Moi
