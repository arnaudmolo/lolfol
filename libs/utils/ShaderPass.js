import THREE, {
  Scene,
  OrthographicCamera,
  Mesh,
  PlaneBufferGeometry,
  UniformsUtils,
  ShaderMaterial
} from 'three'

export default class ShaderPass {

  renderToScreen = false
  enabled        = true
  needsSwap      = true
  clear          = false
  camera         = new OrthographicCamera( -1, 1, 1, -1, 0, 1 )
  quad           = new Mesh( new PlaneBufferGeometry( 2, 2 ), null )
  
  constructor(shader, textureID) {
    this.textureID = textureID != null ? textureID : "tDiffuse"

    this.uniforms = UniformsUtils.clone(shader.uniforms)
    this.material = new ShaderMaterial({
      defines: shader.defines || {},
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    })

    this.scene = new Scene()
    this.scene.add(this.quad)
  }

  render(renderer, writeBuffer, readBuffer, delta) {
    if (this.uniforms[this.textureID]) {
      this.uniforms[this.textureID].value = readBuffer
    }

    this.quad.material = this.material

    if (this.renderToScreen) {
      renderer.render(this.scene, this.camera)
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, this.clear)
    }
  }
}
