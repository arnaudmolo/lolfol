import React, { Component, PropTypes } from 'react';
import {Spring, TransitionSpring} from 'react-motion';
import {range, min, max} from 'd3';
import autobind from 'autobind-decorator';

import Circle from './../canvas/circle';
import Bezier from './../canvas/bezier';
import Shape  from './../canvas/shape';

import california from './../../data/california';
import {circle} from './../canvas/utils';

import {Surface, Image, Text, Group} from 'react-canvas';

const {abs, ceil} = Math

function removeOffset([minX, minY], maxY) {
  return function([x, y]) {
    const X = x + abs(minX)
    const Y = (y - abs(minY)) * -1 + (maxY - minY)
    return [X, Y]
  }
}

function getX(coords) {
  return coords[0]
}

function getY(coords) {
  return coords[1]
}

function size(multiplicator) {
  return function([x, y]) {
    return [x * multiplicator, y * multiplicator]
  }
}

const coordinates = california.coordinates[0];

const minX = min(coordinates, getX)
const minY = min(coordinates, getY)
const maxY = max(coordinates, getY)

const res = coordinates.map(removeOffset([minX, minY], maxY)).map(size(50));
const circleShape = circle(res);

const {cos, sin, PI} = Math;

console.log(res.length);

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

      const res = arrayToObject([{
        val: {x, y}
      }]);
      return res;
    }

    return arrayToObject(range(nbCircles).map(function(_, i) {
      const radiant = i / nbCircles
      const cosinus = cos(radiant * PI * 2);
      const sinus   = sin(radiant * PI * 2);

      return {
        val: {
          x: x + radius * cosinus,
          y: y + radius * sinus
        },
      }
    }));
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
        // onClick={this[onMouseMove]}
        onMouseMove={this[onMouseMove]}
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
                          <Shape  style={{style: val}} coordinates={res} />
                        </Group>
                      )
                    }
                    return (<Shape key={i} style={val} coordinates={{start: res, end: circleShape}} />)
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
