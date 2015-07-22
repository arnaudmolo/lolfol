import React, { Component, PropTypes } from 'react';
import {Spring, TransitionSpring} from 'react-motion';
import {range} from 'd3';
import autobind from 'autobind-decorator';

import Circle from './../canvas/circle';
import Bezier from './../canvas/bezier';

import {Surface, Image, Text, Group} from 'react-canvas';

const {cos, sin, PI} = Math;

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
    const {x, y}  = {...this.state.mouse};
    const counter = this.props.counter.get('counter');

    const mirroredX = -x<0?-x+innerWidth:x;
    const mirroredY = -y<0?-y+innerHeight:y;

    return {
      val: range(counter + 1).map(function(_, i) {
        const cosinus = Math.floor(cos(i/(counter+1) * PI));
        const sinus   = Math.floor(sin(i/(counter+1) * PI + PI/2));
        return {
          x: x * cosinus,
          y: y * sinus
        }
      })
    }
    return res;
  }

  [onMouseMove]({pageX, pageY}) {
    this.setState({mouse: {y: pageY, x: pageX}});
  }

  render() {
    const {increment, counter} = this.props;
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
        onClick={increment}
      >
        <Surface width={innerWidth} height={innerHeight} x={0} y={0}>
          <TransitionSpring endValue={this.getValues}>
            {({val}) => {
              return (
                <Group>
                  {val.map((val, i) => {
                    return (<Circle key={i} style={val} />)
                  })}
                </Group>
              );
            }}
          </TransitionSpring>
        </Surface>
      </div>
    );
  }

}

export default Moi
