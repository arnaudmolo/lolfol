import React, {Component} from 'react';
import {Group, registerLayerType, createCanvasComponent} from 'react-canvas';
import createComponent from 'react-canvas/lib/createComponent';
import LayerMixin from 'react-canvas/lib/LayerMixin';

function colorGenerator(x, y){
  return `rgb(${Math.floor(x/innerWidth*255)}, ${Math.floor(y/innerHeight*255)}, ${200})`;
}

registerLayerType('circle', function(ctx, {left, top}) {
  const color = colorGenerator(left, top);
  
  if (left <= 0) {
    left = left + innerWidth
  };

  ctx.beginPath();
  ctx.arc(left, top, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
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
  }
});
