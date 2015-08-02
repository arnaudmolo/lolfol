import THREE, {
  LinearFilter,
  RGBFormat,
  WebGLRenderTarget,
  OrthographicCamera,
  Mesh,
  Scene,
  PlaneGeometry,
} from 'three'

import ShaderPass from './ShaderPass'
import MaskPass from './MaskPass'
import ClearMaskPass from './ClearMaskPass'
import CopyShader from 'three-copyshader'

class EffectComposer {

  static camera = new OrthographicCamera( -1, 1, 1, -1, 0, 1 )
  static quad   = new Mesh(new PlaneGeometry( 2, 2 ), null );
  static scene  = new Scene()

  passes = []

  copyPass = new ShaderPass(CopyShader)

  constructor(renderer, renderTarget) {
    
    this.renderer = renderer

    if (renderTarget == null) {
      const width = innerWidth || 1
      const height = innerHeight || 1
      const parameters = {
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        stencilBuffer: false
      }
      renderTarget = new WebGLRenderTarget(width, height, parameters)
    }

    this.renderTarget1 = renderTarget
    this.renderTarget2 = renderTarget.clone()
    this.writeBuffer   = this.renderTarget1
    this.readBuffer    = this.renderTarget2

    if ( CopyShader === undefined ) {
      console.error( "THREE.EffectComposer relies on THREE.CopyShader" )
    }
  }

  swapBuffers() {
    const tmp = this.readBuffer
    this.readBuffer = this.writeBuffer
    this.writeBuffer = tmp
  }

  addPass(pass) {
    this.passes.push(pass)
  }

  insertPass(pass, index) {
    this.passes.splice(index, 0, pass)
  }

  render(delta) {
    this.writeBuffer = this.renderTarget1
    this.readBuffer = this.renderTarget2

    var maskActive = false

    var pass, i, il = this.passes.length;

    for ( i = 0; i < il; i ++ ) {
      pass = this.passes[i];
      if (!pass.enabled) continue;
      
      pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive);
      if (pass.needsSwap) {
        if (maskActive) {
          var context = this.renderer.context;
          context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );
          this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, delta );
          context.stencilFunc( context.EQUAL, 1, 0xffffffff );
        }
        this.swapBuffers();
      }
      if (pass instanceof MaskPass) {
        maskActive = true;
      } else if (pass instanceof ClearMaskPass) {
        maskActive = false;
      }
    }

  }

  reset(renderTarget) {

    if ( renderTarget === undefined ) {

      renderTarget = this.renderTarget1.clone();

      renderTarget.width = window.innerWidth;
      renderTarget.height = window.innerHeight;

    }

    this.renderTarget1 = renderTarget;
    this.renderTarget2 = renderTarget.clone();

    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;

  }

  setSize(width, height) {

    var renderTarget = this.renderTarget1.clone();

    renderTarget.width = width;
    renderTarget.height = height;

    this.reset(renderTarget);
  }
}

EffectComposer.scene.add(EffectComposer.quad);

export default EffectComposer
