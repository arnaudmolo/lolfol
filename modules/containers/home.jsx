import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'redux/react'
import {create} from 'react-style'

import * as HomeActions from './../actions/home-actions'

import GeneratedImage from './../components/generated-image/generated-image'
import TV from './../components/three/tv'

const img1 = './img/lol.jpg'
const img2 = './img/face-0.jpg'

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
    this.state = {src: img1}
  }

  onClick = () => {
    if (this.state.src === img1) {
      return this.setState({src: img2})
    }
    this.setState({src: img1})
  }

  render() {
    return (
      <div style={create({position: 'fixed', left: 0, right: 0, width: "100%", height: "100%"})}
        onTouch={this.onClick}
      >
        <TV width={innerWidth} height={innerHeight} src={this.state.src} />
      </div>
    )
  }
}
