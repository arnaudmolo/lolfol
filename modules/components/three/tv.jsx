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

export default class TVThree extends Component {

  tvEffect = new BadTVPasses()

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

    const texture   = ImageUtils.loadTexture('./img/lol.jpg')

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

    // document.querySelector('canvas').addEventListener('click', function() {
    //   badTVJamming.preset('lightNoScroll')
    // })

    onRenderFcts.push(function(delta) {
      composer.render(delta)
    })

    // window.addEventListener('mousemove', function({pageX, pageY}) {
    //   badTVPasses.params.badTV.distortion = pageX / width * 20
    //   badTVPasses.params.rgb.amount = pageY / height * 0.1
    //   badTVPasses.onParamsChange()
    // }, false)

    let lastTimeMsec = null

    requestAnimationFrame(function animate(nowMsec){
      requestAnimationFrame(animate)
      // measure time
      lastTimeMsec    = lastTimeMsec || nowMsec-1000/60
      var deltaMsec   = Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec    = nowMsec
      // call each update function
      onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec / 1000, nowMsec / 1000)
      })
    })
  }

  onClick() {
    console.log('"log"');
  }

  render() {
    return (
      <div  onClick={this._onClick}>
        <canvas />
      </div>
    )
  }
}
