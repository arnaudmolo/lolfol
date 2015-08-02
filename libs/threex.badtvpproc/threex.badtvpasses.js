import THREE from 'three';
import ShaderPass from './../utils/ShaderPass'

import BadTVShader from './shaders/BadTVShader'
import RGBShiftShader from './shaders/RGBShiftShader'
import FilmShader from './shaders/FilmShader'
import StaticShader from './shaders/StaticShader'

/**
 * the post processing passes for a BadTV effect
 * - ideas and shaders by @felixturner
 */

export default class BadTVPasses extends THREE.EventDispatcher {

  badTVPass  = new ShaderPass(BadTVShader)
  rgbPass    = new ShaderPass(RGBShiftShader)
  filmPass   = new ShaderPass(FilmShader)
  staticPass = new ShaderPass(StaticShader)

  params = new Params()
  tweenDelay     = 0.1
  tweenStartDate = null
  tweenSrcParams = new Params()
  tweenDstParams = new Params()

  constructor() {
    super()
    this.filmPass.uniforms["grayscale"].value = 0;
  }

  addPassesTo(composer) {
    composer.addPass(this.filmPass);
    composer.addPass(this.badTVPass);
    composer.addPass(this.rgbPass);
    composer.addPass(this.staticPass); 
  }

  update = (delta, now) => {
    this.badTVPass.uniforms['time'].value  = now
    this.filmPass.uniforms['time'].value   = now
    this.staticPass.uniforms['time'].value = now

    if(this.tweenStartDate !== null){
      const present = Date.now() / 1000
      if(present - this.tweenStartDate >= this.tweenDelay){
        this.params.copy(this.tweenDstParams)
        this.tweenStartDate = null
        this.dispatchEvent({type: 'tweenCompleted'})
      } else {
        const amount = (present - this.tweenStartDate) / this.tweenDelay
        // console.log('tweening', amount)
        this.params.lerp(this.tweenSrcParams, this.tweenDstParams, amount)
      }
      this.updateUniforms()  
    }
  }

  onParamsChange() {
    this.tweenStartDate = Date.now() / 1000
    this.tweenSrcParams.copy(this.params)
    this.updateUniforms()
  }

  updateUniforms() {
      //copy gui params into shader uniforms
      this.badTVPass.uniforms["distortion"].value  = this.params.badTV.distortion
      this.badTVPass.uniforms["distortion2"].value = this.params.badTV.distortion2
      this.badTVPass.uniforms["speed"].value       = this.params.badTV.speed
      this.badTVPass.uniforms["rollSpeed"].value   = this.params.badTV.rollSpeed
      this.badTVPass.uniforms["randomSeed"].value  = this.params.badTV.randomSeed

      this.staticPass.uniforms["amount"].value = this.params.staticNoise.amount
      this.staticPass.uniforms["size"].value   = this.params.staticNoise.size2

      this.rgbPass.uniforms["angle"].value  = this.params.rgb.angle * Math.PI
      this.rgbPass.uniforms["amount"].value = this.params.rgb.amount

      this.filmPass.uniforms["sCount"].value     = this.params.film.count
      this.filmPass.uniforms["sIntensity"].value = this.params.film.sIntensity
      this.filmPass.uniforms["nIntensity"].value = this.params.film.nIntensity
  }
}

class Params {

  film = {
    count       : 800,
    sIntensity  : 0.9,
    nIntensity  : 0.4
  }

  badTV    = {
    distortion  : 0.1,
    distortion2 : 0.1,
    speed       : 0.0,
    rollSpeed   : 0.0,
    randomSeed  : 0.0,
  }

  rgb = {
    amount      : 0.0,
    angle       : 0.0,
  }

  staticNoise  = {
    amount      : 0.0,
    size2       : 4.0
  }

  constructor() {
    const presets = {
      reset(){
        this.badTV.distortion    = 0.1
        this.badTV.distortion2   = 0.1
        this.badTV.speed     = 0
        this.badTV.rollSpeed     = 0
        this.badTV.randomSeed    = 0
        this.rgb.angle       = 0
        this.rgb.amount      = 0
        this.staticNoise.amount  = 0
        this.film.count  = 800;
        this.film.sIntensity = 0.0;
        this.film.nIntensity = 0.0;
      },
      resetInterlace() {
        this.presets.reset()
        this.film.count  = 800;
        this.film.sIntensity = 0.9;
        this.film.nIntensity = 0.4;
      },
      light() {
        this.badTV.distortion    = Math.random()*3+3;
        this.badTV.distortion2   = Math.random()*1+0.1;
        this.badTV.randomSeed    = Math.random()*150
        this.rgb.angle       = Math.random()*10/180*Math.PI*2;
        this.rgb.amount      = Math.random()*0.02+0.0;
      },
      strong() {
        this.badTV.distortion    = Math.random()*10+0.1;
        this.badTV.distortion2   = Math.random()*10+0.1;
        this.badTV.speed     = Math.random()*.4;
        this.badTV.rollSpeed     = Math.random()*.2;
        this.rgb.angle       = Math.random()*2;
        this.rgb.amount      = Math.random()*0.03;
        this.staticNoise.amount  = Math.random()*0.2;            
      }
    }

    this.presets = {}

    Object.keys(presets).forEach((i, d) => {
      this.presets[i] = presets[i].bind(this);
    })

    this.reset()

  }

  lerp(srcParams, dstParams, amount) {
    this.film.count      = compute(srcParams.film.count, dstParams.film.count, amount)
    this.film.sIntensity = compute(srcParams.film.sIntensity, dstParams.film.sIntensity, amount)
    this.film.nIntensity = compute(srcParams.film.nIntensity, dstParams.film.nIntensity, amount)

    this.badTV.distortion  = compute(srcParams.badTV.distortion, dstParams.badTV.distortion, amount)
    this.badTV.distortion2 = compute(srcParams.badTV.distortion2, dstParams.badTV.distortion2, amount)
    this.badTV.speed       = compute(srcParams.badTV.speed, dstParams.badTV.speed, amount)
    this.badTV.rollSpeed   = compute(srcParams.badTV.rollSpeed, dstParams.badTV.rollSpeed, amount)
    this.badTV.randomSeed  = dstParams.badTV.randomSeed

    this.rgb.angle  = compute(srcParams.rgb.angle, dstParams.rgb.angle, amount)
    this.rgb.angle  = dstParams.rgb.angle
    this.rgb.amount = compute(srcParams.rgb.amount, dstParams.rgb.amount, amount)

    this.staticNoise.amount = compute(srcParams.staticNoise.amount, dstParams.staticNoise.amount, amount)
    this.staticNoise.size2  = compute(srcParams.staticNoise.size2, dstParams.staticNoise.size2, amount)
  }

  copy(other) {
    this.badTV.distortion   = other.badTV.distortion
    this.badTV.distortion2  = other.badTV.distortion2
    this.badTV.speed    = other.badTV.speed
    this.badTV.rollSpeed    = other.badTV.rollSpeed
    this.badTV.randomSeed   = other.badTV.randomSeed

    this.staticNoise.amount = other.staticNoise.amount
    this.staticNoise.size2  = other.staticNoise.size2

    this.rgb.amount     = other.rgb.amount
    this.rgb.angle      = other.rgb.angle

    this.film.count     = other.film.count
    this.film.sIntensity    = other.film.sIntensity
    this.film.nIntensity    = other.film.nIntensity
  }

  preset(label) {
    console.assert(label in this.presets === true)
    this.presets[label]()
  }

  reset() {
    this.preset('reset')
  }

}

function compute(srcValue, dstValue, amount){
  return srcValue + (dstValue-srcValue)*amount
}
