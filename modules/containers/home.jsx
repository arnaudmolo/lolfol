import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'redux/react'
import {create} from 'react-style'
import Hammer from 'react-hammerjs'

import * as HomeActions from './../actions/home-actions'

import GeneratedImage from './../components/generated-image/generated-image'
import TV from './../components/three/tv'

const projects = [
  {
    src: './img/face-0.jpg',
    url: '_blanck'
  }, {
    src: './img/face-1.jpg',
    url: '_blanck'
  }, {
    src: './img/face-2.jpg',
    url: '_blanck'
  }, {
    src: './img/face-3.jpg',
    url: '_blanck'
  }]

const options = {
  touchAction:true,
  recognizers: {
    swipe: {
      threshold: 50
    },
    tap: {
      threshold: 300
    }
  }
}

function getImageStyle() {
  return create({
    position: 'absolute',
    left: 0,
    right: 0,
    maxHeight: innerHeight,
    maxWidth: innerWidth,
    pointerEvents: 'none'
  })
}

function getCanvasStyle() {
  return create({...getImageStyle()})
}

export default class Home extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {index: 0}
  }

  increaseProject(increase) {

    const {index} = this.state

    if (increase && index <= 3) {
      return this.setState({index: index + 1})
    }
    if (index >= 0) {
      return this.setState({index: index - 1})
    }
  }

  onTap = (event) => {
    open(projects[this.state.index].url)
  }

  onSwipe = (event) => {
    this.increaseProject(event.deltaX<=0)
  }

  render() {
    return (
      <div style={create({position: 'fixed', left: 0, right: 0, width: "100%", height: "100%"})} >
        <Hammer onSwipe={this.onSwipe} options={options} onTap={this.onTap} >
          <TV width={innerWidth} height={innerHeight} src={projects[this.state.index].src} />
        </Hammer>
      </div>
    )
  }
}
