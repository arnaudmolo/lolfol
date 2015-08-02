import Three, {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  CubeGeometry,
  MeshNormalMaterial,
  Mesh,
  RenderPass,
} from 'three'

import EffectComposer from './../libs/utils/EffectComposer'

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
console.log(badTVPasses.params);

const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)

composer.addPass(renderPass)
badTVPasses.addPassesTo(composer)
composer.passes[composer.passes.length - 1].renderToScreen = true
