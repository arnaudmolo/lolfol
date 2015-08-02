import React, {Component, PropTypes, findDOMNode} from 'react'

import {Surface, Image, Group, createCanvasComponent} from 'react-canvas'
import {Spring} from 'react-motion'
import './layer-type'

import Three from 'three'

import * as X from './../../../libs/threex.badtvpproc/threex.badtvdatgui'

console.log(Three, X);

function getImageStyle() {
  return {
    top: 0,
    left: 0
  }
}

const divStyle = {
  position: 'absolute',
  top: 0,
  left: 0
}

const config = {config: [100, 10]}
const RawCanvasComponent = createCanvasComponent({
  displayName: 'GeneratedImage',
  layerType: 'generatedImage',
  applyCustomProps(prevProps, props) {
    const style = (props && props.style) ? props.style : {}
    const layer = this.node
    layer.imageContext = props.imageContext
    layer.t = props.t
    layer.width = props.width
    layer.height = props.height
  }
})

export default class GeneratedImage extends Component {

  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      loaded: false,
      imageContext: null,
      val: 0
    }
  }

  imageLoaded = context => {
    setTimeout(() => {
      this.setState({loaded: true, val: 0})
    }, 10)

    this.launchInterval()
  }

  launchInterval() {
    setTimeout(() => {
      this.setState({val: this.state.val += 0.01})
      this.launchInterval()
    }, 800)
  }

  getContext = context => {
    this.setState({imageContext: context})
  }

  getEndValue(prev) {
    return prev == null ? {val: 0, ...config} : {val: 1, ...config}
  }

  render() {
    const {src, width, height} = this.props
    const {val, imageContext, loaded} = this.state
    return (
      <div style={{position: 'absolute', left: 0, top: 0}}>
        <div style={divStyle}>
          <Surface top={0} left={0} width={width} height={height} getContext={this.getContext}>
            <Image style={{...getImageStyle(), ...{width, height}}} src={src} onLoad={this.imageLoaded}/>
          </Surface>
        </div>
        <div style={{width: width, height: height, ...divStyle}}>
          <Surface top={0} left={0} width={width} height={height} style={{opacity: 0}}>
            {loaded?(
              <RawCanvasComponent t={val} imageContext={imageContext} width={width} height={height} />
            ):null}
          </Surface>
        </div>
      </div>
    )
  }
}
