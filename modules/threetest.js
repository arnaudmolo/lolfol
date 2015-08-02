import Three, {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  CubeGeometry,
  MeshNormalMaterial,
  Mesh,
} from 'three'

window.THREE = Three

import EffectComposer from './../libs/utils/EffectComposer'
import RenderPass from './../libs/utils/RenderPass'

import BadTVPasses from './../libs/threex.badtvpproc/threex.badtvpasses'
import addBadTVPasses2DatGui from './../libs/threex.badtvpproc/threex.badtvdatgui'

const renderer = new WebGLRenderer()

renderer.setSize(innerWidth, innerHeight)

document.body.appendChild(renderer.domElement)

const onRenderFcts = []
const scene = new Scene()
const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.01, 1000)

camera.position.z = 3

const geometry = new CubeGeometry(1, 1, 1)
const material = new MeshNormalMaterial()
const mesh     = new Mesh(geometry, material)

scene.add(mesh)

const badTVPasses = new BadTVPasses()

onRenderFcts.push(badTVPasses.update)

addBadTVPasses2DatGui(badTVPasses)

const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)

composer.addPass(renderPass)
badTVPasses.addPassesTo(composer)
composer.passes[composer.passes.length - 1].renderToScreen = true

const mouse = {x: 0, y: 0}

document.addEventListener('mousemove', function(event){
  console.log("log");
  mouse.x = (event.clientX / window.innerWidth ) - 0.5
  mouse.y = (event.clientY / window.innerHeight) - 0.5
}, false)

onRenderFcts.push(function(delta, now){
  camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3)
  camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3)
  camera.lookAt(scene.position)
})

onRenderFcts.push(function(delta) {
  console.log(composer.render);
  composer.render(delta)
})

let lastTimeMsec = null

requestAnimationFrame(function animate(nowMsec) {
  requestAnimationFrame(animate)
  lastTimeMsec    = lastTimeMsec || nowMsec-1000/60
  var deltaMsec   = Math.min(200, nowMsec - lastTimeMsec)
  lastTimeMsec    = nowMsec
  // call each update function
  onRenderFcts.forEach(function(onRenderFct){
    onRenderFct(deltaMsec/1000, nowMsec/1000)
  })
})
