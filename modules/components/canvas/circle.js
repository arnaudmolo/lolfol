import React, {Component} from 'react';
import {Group, registerLayerType, createCanvasComponent} from 'react-canvas';
import createComponent from 'react-canvas/lib/createComponent';
import LayerMixin from 'react-canvas/lib/LayerMixin';

registerLayerType('circle', function(ctx, layer) {
  ctx.beginPath();
  ctx.arc(layer.left, layer.top, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
});

export default createCanvasComponent({
  displayName: 'Circle',
  layerType: 'circle',
  applyCustomProps(prevProps, props) {
    const style = (props && props.style) ? props.style : {};
    const layer = this.node;
    layer.shadowColor = style.shadowColor || 0;
    layer.shadowOffsetX = style.shadowOffsetX || 0;
    layer.shadowOffsetY = style.shadowOffsetY || 0;
    layer.shadowBlur = style.shadowBlur || 0;
    layer.left = style.left;
    layer.top  = style.top;
  },

  // mountComponent(rootID, transaction, context) {
  //   const props = this._currentElement.props;
  //   const layer = this.node;
  //   this.applyLayerProps({}, props);
  //   this.applyCircleProps({}, props);
  //   return layer;
  // },

  // receiveComponent(nextComponent, transaction, context) {
  //   const prevProps = this._currentElement.props;
  //   const props = nextComponent.props;
  //   this.applyLayerProps(prevProps, props);
  //   // this.applyCircleProps(prevProps, props);
  //   this._currentElement = nextComponent;
  // }

});
