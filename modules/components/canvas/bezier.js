import {registerLayerType, createCanvasComponent} from 'react-canvas';

registerLayerType('bezier', function(ctx, layer) {
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#333";
  ctx.beginPath();
  ctx.moveTo(layer.start.x, layer.start.y);
  ctx.quadraticCurveTo(innerWidth / 2, innerHeight / 2, layer.end.x, layer.end.y);
  ctx.stroke();
});

export default createCanvasComponent({
  displayName: 'Bezier',
  layerType  : 'bezier',

  applyCustomProps(prevProps, props) {
    const style = (props && props.style) ? props.style : {};
    const layer = this.node;

    layer.start = style.start;
    layer.end   = style.end;
  }
});
