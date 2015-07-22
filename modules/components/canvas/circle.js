import {registerLayerType, createCanvasComponent} from 'react-canvas';

function colorGenerator(x, y){
  return `rgb(${Math.floor(x/innerWidth*255)}, ${Math.floor(y/innerHeight*255)}, ${200})`;
}

registerLayerType('circle', function(ctx, {x, y}) {
  const color = colorGenerator(x, y);
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
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
    layer.x = style.x;
    layer.y = style.y;
  }
});
