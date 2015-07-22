import React, { Component, PropTypes } from 'react';
import {Spring, TransitionSpring} from 'react-motion';
import {range} from 'd3';
import autobind from 'autobind-decorator';

import Circle from './../canvas/circle';
import Bezier from './../canvas/bezier';

import {Surface, Image, Text, Group} from 'react-canvas';

const {cos, sin, PI} = Math;

function arrayToObject(array) {
  return array.reduce((o, v, i) => { 
    o[i] = v;
    return o;
  }, {});
}

const style = {
  width: 300,
  height: 150,
  position: 'absolute',
  x: 0,
  y: 0
};

const onMouseMove = Symbol();

var center = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const radius = 200;

class Moi extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {mouse: {y: 0, x: 0}};
    this.getValues = this.getValues.bind(this);
    this[onMouseMove] = this[onMouseMove].bind(this);
    window.onresize = () => {
      center = {
        x: innerWidth / 2,
        y: innerHeight / 2
      }
      this.forceUpdate()
    }
  }

  getValues() {
    const {x, y}  = {...this.state.mouse};
    const nbCircles = this.props.counter.get('counter') + 1;

    if (nbCircles <= 1) {
      return arrayToObject([{val: {x, y}}]);
    }

    const res = arrayToObject(range(nbCircles).map(function(_, i) {
      const radiant = i / nbCircles
      const cosinus = cos(radiant * PI * 2);
      const sinus   = sin(radiant * PI * 2);
      return {
        val: {
          x: x + radius * cosinus,
          y: y + radius * sinus
        }
      }
    }));

    return res;
  }

  [onMouseMove]({pageX, pageY}) {
    this.setState({mouse: {y: pageY, x: pageX}});
  }

  render() {
    const {increment, circular, counter} = this.props;
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
          <TransitionSpring endValue={this.getValues}>
            {(rest) => {
              return (
                <Group>
                  {Object.keys(rest).map((i) => {
                    const {val} = rest[i];
                    if (i >= 1) {
                      return (
                        <Group key={i}>
                          <Circle style={val} />
                          <Bezier style={{start: val, end: rest[i-1].val}} />
                        </Group>
                      )
                    }
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
