import {registerLayerType} from 'react-canvas'
import {glitchImageData} from './../canvas/glitch'

function getGlitchStyle(t = 0.2) {
  return {
    seed:       t*20, // integer between 0 and 99
    quality:    39,   // integer between 0 and 99
    amount:     5,    // integer between 0 and 99
    iterations: 2     // integer
  }
}

function done(ctx) {
  return function(imageData) {
    ctx.drawImage(imageData, 0, 0)
  }
}

registerLayerType('generatedImage', function(ctx, layer) {
  if (layer.imageContext) {
    const {t, imageContext, width, height} = layer
    const imageData = imageContext.getImageData(0, 0, width, height)
    const glitchedData = glitchImageData(imageData, getGlitchStyle(t), done(ctx))
  }
})
