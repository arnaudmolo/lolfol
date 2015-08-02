import THREE, {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  PlaneGeometry,
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

var video    = document.createElement( 'video' );
video.loop   = true;
video.volume = 0;
video.src    = "videos/fits.mp4";
video.play();
// create the texture

var texture = new Texture( video );
texture.minFilter   = NearestFilter;
texture.magFilter   = NearestFilter;
onRenderFcts.push(function(delta, now){
    if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
        if ( texture ) texture.needsUpdate = true;
    }       
})

const geometry = new PlaneGeometry(innerWidth, innerHeight)
const material = new MeshBasicMaterial({map: texture})
const mesh     = new Mesh(geometry, material)

scene.add(mesh)

const badTVPasses = new BadTVPasses()

onRenderFcts.push(function(delta, now) {
  badTVPasses.update(delta, now)
})

addBadTVPasses2DatGui(badTVPasses)

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

let lastTimeMsec = null

requestAnimationFrame(function animate(nowMsec){
    // keep looping
    requestAnimationFrame(animate);
    // measure time
    lastTimeMsec    = lastTimeMsec || nowMsec-1000/60
    var deltaMsec   = Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec    = nowMsec
    // call each update function
    onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec/1000, nowMsec/1000)
    })
})
