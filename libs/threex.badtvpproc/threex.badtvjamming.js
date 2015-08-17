/**
 * vendor.js framework definition
 * @type {Object}
 */


/**
 * BadTV Jamming effect
 * 
 * @constructor
 * 
 * @param {THREEx.BadTVPasses} badTVPasses 
 * @param {[type]} context     [description]
 * @param {[type]} destination [description]
 */

import BadTVSound from './threex.badtvsound'

class BadTVJamming {

  /**
   * true if a jamming is in progress, false otherwise
   * @type {Boolean}
   */
  inProgress = false
  presets = {
    'lightNoScroll' : ['light' , 'resetInterlace' ,  2, 0.1],
    'strongScrolly' : ['strong', 'resetInterlace' , 10, 0.10]
  }

  constructor(badTVPasses, context, destination) {
    destination = destination || context.destination
    this.badTVSound = new BadTVSound(context, destination)
    this.badTVPasses = badTVPasses
  }

  trigger(passesFirstLabel, passesLastLabel, nShakeSteps, tweenDelay) {
    console.assert( typeof(passesFirstLabel) === 'string' )
    console.assert( typeof(passesLastLabel) === 'string' )
    console.assert( typeof(nShakeSteps) === 'number' )
    console.assert( typeof(tweenDelay) === 'number' )

    console.log('trigger');

    if (this.inProgress) {
      return
    }

    this.inProgress = true
    this.badTVSound.play()
    this.badTVPasses.params.preset(passesFirstLabel)
    this.badTVPasses.onParamsChange()
    this.badTVPasses.tweenDelay = tweenDelay

    const callback = () => {
      if( nShakeSteps === 0 ) return
      // count this shake
      nShakeSteps -= 1;
      if( nShakeSteps > 0 ){
        // start the next shake
        this.badTVPasses.params.preset(passesFirstLabel)     
      }else{
        // end all shake
        this.badTVPasses.params.preset(passesLastLabel)
        this.badTVPasses.removeEventListener('tweenCompleted', callback)
        this.inProgress = false
      }
      this.badTVPasses.onParamsChange()    
    }

    this.badTVPasses.addEventListener('tweenCompleted', callback)
  }

  preset(label) {
    console.assert(label in this.presets === true)
    var presetArgs  = this.presets[label]
    this.trigger.apply(this, presetArgs)
  }
}

export default function factory(...r) {
  return new BadTVJamming(...r)
}
