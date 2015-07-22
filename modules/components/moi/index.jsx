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
    window.onresize = () => {
      this.forceUpdate()
    }
  }

  getValues(currentPositions) {
    const {mouse} = this.state;
    const {x, y}  = mouse;

    const mirroredX = -x<0?-x+innerWidth:x;
    const mirroredY = -y<0?-y+innerHeight:y;

    if (this.props.counter.get('counter')%2) {
      return {
        val: {
          left: mouse,
          right: {
            x: mirroredX,
            y: mirroredY
          }
        }
      };
    }

    return {
      val: {
        left: mouse,
        right: {
          x: mirroredX,
          y: mouse.y
        }
      }
    };
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
          height: innerHeight,
          backgroundColor: "black",
          position: "absolute",
          top: 0,
          left: 0
        }}
        onMouseMove={this[onMouseMove]}
        onClick={circular}
      >
        <Surface width={innerWidth} height={innerHeight} x={0} y={0}>
          <Spring endValue={this.getValues}>
            {({val}) => {
              const {left, right} = val;
              return (
                <Group>
                  <Circle style={{...style, ...left}} />
                  <Bezier style={{start: left, end: right}} />
                  <Circle style={{...style, ...right}} />
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
