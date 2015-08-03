/**
 * vendor.js framework definition
 * @type {Object}
 */

/*
 * sounds/19487__halleck__jacobsladdersingle2.wav
 * sounds/132834__bekir-virtualdj__electric.mp3
 */

function decodeAudioData(context, onLoad, onError) {
  return function(arraybuffer) {
    context.decodeAudioData(arraybuffer, onLoad, onError)
  }
}

export default class BadTVSound {

  static baseUrl = '../'

  buffer      = null
  context     = null
  destination = null
  url         = `${BadTVSound.baseUrl}./sounds/19487__halleck__jacobsladdersingle2.wav`

  constructor(context, destination, onLoad, onError) {

    this.context     = context
    this.destination = destination

    console.log(this.loadSoundWebAudio(decodedBuffer => this.buffer = decodedBuffer, onError))
  }

  onError(e) {
    console.warn('error', e)
  }

  async loadSoundWebAudio(onLoad = this.onLoad, onError = this.onError) {
    return fetch(this.url)
      .then((response) => response.arrayBuffer())
      .then(decodeAudioData(this.context, onLoad, onError))
  }

  isReady() {
    return this.buffer != null
  }

  play() {
    if (!this.isReady()) {
      console.log('buffer is not loaded')
      return
    }
    const source = this.context.createBufferSource()
    source.buffer = this.buffer
    source.connect(this.destination)
    source.start(0)
    return source
  }
}
