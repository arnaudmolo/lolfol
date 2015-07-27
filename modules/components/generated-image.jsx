import React, {Component, PropTypes, findDOMNode} from 'react';

import {Surface, Image, Text, Group, registerLayerType, createCanvasComponent} from 'react-canvas';

function getImageStyle() {
   return {
     top: 0,
     left: 0,
     width: innerWidth,
     height: innerHeight
   };
 }

// registerLayerType('generatedImage', function(ctx, layer) {

//   console.log(layer);

// });

const RawCanvasComponent = createCanvasComponent({
  displayName: 'GeneratedImage',
  layerType: 'generatedImage',

  applyCustomProps(prevProps, props) {

    console.log("applyCustomProps");

  }

});


export default class GeneratedImage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loaded: false
    }
  }

  imageLoaded = context => {
    this.setState({loaded: true});
  }

  render() {
    const {src} = this.props;
    return (
      <Surface top={0} left={0} width={innerWidth} height={innerHeight}>
        <Group>
          <Image ref="getContext" style={getImageStyle()} src={src} onLoad={this.imageLoaded}/>
          {this.state.loaded?<RawCanvasComponent />:null}
        </Group>
      </Surface>
    );
  }
}
