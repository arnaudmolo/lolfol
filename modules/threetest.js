import THREE, {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Texture,
  NearestFilter,
  ImageUtils,
} from 'three'
import EffectComposer from './../libs/utils/EffectComposer'
import RenderPass from './../libs/utils/RenderPass'
import BadTVPasses from './../libs/threex.badtvpproc/threex.badtvpasses'
import BadTVJamming from './../libs/threex.badtvpproc/threex.badtvjamming'
import addBadTVPasses2DatGui from './../libs/threex.badtvpproc/threex.badtvdatgui'

const renderer = new WebGLRenderer()

renderer.setSize(innerWidth, innerHeight)

document.body.appendChild(renderer.domElement)

const onRenderFcts = []
const scene = new Scene()
const camera = new OrthographicCamera(innerWidth / - 2, innerWidth / 2, innerHeight / 2, innerHeight / - 2, -10000, 10000 )

camera.position.z = 3

const geometry = new PlaneBufferGeometry(innerWidth, innerHeight)
const material = new MeshBasicMaterial({map: ImageUtils.loadTexture('./img/lol.jpg')})
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

document.querySelector('canvas').addEventListener('click', function() {
  badTVJamming.preset('lightNoScroll')
})

window.switchValue = function(value) {
  badTVJaming.preset(value)
}

onRenderFcts.push(function(delta) {
  composer.render(delta)
})

// window.addEventListener('mousemove', function({pageX, pageY}) {
//   badTVPasses.params.badTV.distortion = pageX / innerWidth * 20
//   badTVPasses.params.rgb.amount = pageY / innerHeight * 0.1
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
