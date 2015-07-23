import {registerLayerType, createCanvasComponent} from 'react-canvas'
import {min, max, interpolateNumber} from 'd3'

// const size = (multiplicator) => ([x, y]) => [x * multiplicator, y * multiplicator]

const MOUSE_OFFSET = 250

function recursiveCeil(array) {
  return array.map[0]!=null?array.map(recursiveCeil):array.map(ceil)
}

registerLayerType('shape', function(ctx, layer) {
  const {coordinates, style} = layer
  const mouseX = style.x
  const mouseY = style.y
  if (coordinates == null) {
    return
  }
  ctx.beginPath()
  ctx.moveTo(coordinates[0][0], coordinates[0][1])
  coordinates
    .forEach(([x, y]) => {
      ctx.lineTo(x, y)
    })
  ctx.strokeStyle = "cyan"
  ctx.stroke()
})

export default createCanvasComponent({
  displayName: 'Shape',
  layerType: 'shape',

  applyCustomProps(prevProps, props) {
    const style = (props && props.style) ? props.style : {}
    const coordinates = (props && props.coordinates) ? props.coordinates : {}
    const layer = this.node
    const {x, y} = style
    const {start, end} = coordinates
    const t = x / innerWidth

    layer.style = style

    const res = start.map(function(startElement, index) {
      const endElement = end[index]
      const interpolatedX = interpolateNumber(startElement[0], endElement[0])(t)
      const interpolatedY = interpolateNumber(startElement[1], endElement[1])(t)
      return [interpolatedX, interpolatedY]
    })
    layer.coordinates = res
  }
})
