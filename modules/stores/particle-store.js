import AppDispatcher from '../dispatcher/app-dispatcher';
import {EventEmitter} from 'events';
import ParticleConstants from '../constants/particle-constants';
import assign from 'object-assign';
import uid from "uid";

const CHANGE_EVENT = 'change';
let particles = {};
let selected = null;

let filteredParticles = {};
let filter = null;

function flush() {
  particles = {};
}

function create(particle) {
  const id = uid(15);
  particles[id] = assign({
    id: id,
    value: Math.random(),
    position: {
      x: (Math.random()*window.innerWidth)-window.innerWidth*0.5,
      y: (Math.random()*window.innerHeight)-window.innerHeight*0.5,
    }
  }, particle);
}

function select(id) {
  selected = id
}

function destroy(id) {
  delete particles[id];
}

var ParticleStore = assign({}, EventEmitter.prototype, {

  setData: function(data) {
    flush();
    for(let datum of data) create(datum);
    ParticleStore.emitChange();
  },

  setFilter: function(fn) {
    filter = fn;
    filteredParticles = fn(particles)
    if (selected && !filteredParticles[selected]) selected = null;
    return filteredParticles;
  },

  getAll: function() {
    return particles;
  },

  getFiltered: function() {
    if (!filter) return particles;
    return filteredParticles;
  },

  getSelected: function() {
    return selected;
  },

  isFiltered: function() {
    return filter !== null;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case ParticleConstants.PARTICLE_CREATE:
        create(action.particle);
        ParticleStore.emitChange();
        break;

      case ParticleConstants.PARTICLE_SELECT:
        if (action.id === selected) return;
        select(action.id)
        ParticleStore.emitChange();
        break;

      case ParticleConstants.PARTICLE_DESTROY:
        destroy(action.id);
        ParticleStore.emitChange();
        break;

      case "SELECT_FILTER":
        ParticleStore.setFilter(action.fn);
        ParticleStore.emitChange();
        break;
    }

    return true;
  })
});

module.exports = ParticleStore;
