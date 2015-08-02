import {Color} from 'three'

export default class RenderPass {


  oldClearColor = new Color()
  oldClearAlpha = 1
  enabled       = true
  clean         = true
  needsSwap     = false

  constructor(scene, camera, overrideMaterial, clearColor, clearAlpha) {
    this.scene            = scene
    this.camera           = camera
    this.overrideMaterial = overrideMaterial
    this.clearColor       = clearColor
    this.clearAlpha       = clearAlpha != null ? clearAlpha : 1
  }

  render(renderer, writeBuffer, readBuffer, delta ) {
    this.scene.overrideMaterial = this.overrideMaterial
    if (this.clearColor) {
      this.oldClearColor.copy(renderer.getClearColor());
      this.oldClearAlpha = renderer.getClearAlpha();
      renderer.setClearColor(this.clearColor, this.clearAlpha);
    }

    renderer.render( this.scene, this.camera, readBuffer, this.clear );

    if (this.clearColor) {
      renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );
    }
    this.scene.overrideMaterial = null;
  }
}
