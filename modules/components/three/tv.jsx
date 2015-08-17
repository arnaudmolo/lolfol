import React, {Component, findDOMNode} from 'react'
import THREE, {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  ImageUtils,
  Mesh,

} from 'three'

import BadTVPasses from './../../../libs/threex.badtvpproc/threex.badtvpasses'
import EffectComposer from './../../../libs/utils/EffectComposer'
import RenderPass from './../../../libs/utils/RenderPass'
import BadTVJamming from './../../../libs/threex.badtvpproc/threex.badtvjamming'

const raf = window.requestAnimationFrame

const AudioContext = window.AudioContext || window.webkitAudioContext

export default class TVThree extends Component {

  tvEffect = new BadTVPasses()
  mesh     = null

  componentDidMount() {

    const {width, height, src} = this.props

    const renderer = new WebGLRenderer({
      canvas: findDOMNode(this).querySelector('canvas')
    })

    renderer.setSize(width, height)

    const onRenderFcts = []
    const scene = new Scene()
    const camera = new OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, -10000, 10000 )

    camera.position.z = 3

    const texture   = ImageUtils.loadTexture(src)

    texture.minFilter = THREE.LinearFilter

    const geometry = new PlaneBufferGeometry(width, height)
    const material = new MeshBasicMaterial({map: texture})
    const mesh     = new Mesh(geometry, material)

    scene.add(mesh)

    const badTVPasses = new BadTVPasses()

    onRenderFcts.push(badTVPasses.update)

    // addBadTVPasses2DatGui(badTVPasses)

    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)

    composer.addPass(renderPass)
    badTVPasses.addPassesTo(composer)
    composer.passes[composer.passes.length - 1].renderToScreen = true

    const context = new AudioContext()
    const badTVJamming = new BadTVJamming(badTVPasses, context)

    onRenderFcts.push(function(delta) {
      composer.render(delta)
    })

    let lastTimeMsec = null

    this.rafID = raf(function animate(nowMsec){
      raf(animate)
      // measure time
      lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
      let deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec  = nowMsec
      // call each update function
      onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec / 1000, nowMsec / 1000)
      })
    })
    this.interactor = badTVJamming
    this.mesh = mesh
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafID)
  }

  componentWillUpdate(nextProps, nextState) {
    const {src} = nextProps
    this.mesh.material.map = ImageUtils.loadTexture(src)
    this.mesh.material.needsUpdate = true
  }

  _onClick = () => {
    this.interactor.preset('lightNoScroll')
  }

  render() {

    const {width, height} = this.props

    return (
      <div onClick={this._onClick} onTouchEnd={this._onClick} style={this.props.style} >
        <canvas width={width} height={height} />
      </div>
    )
  }
}
