import AppDispatcher from '../dispatcher/app-dispatcher';
import ParticleConstants from '../constants/particle-constants';

const ParticleActions = {
  create: function(particle) {
    AppDispatcher.dispatch({
      actionType: ParticleConstants.PARTICLE_CREATE,
      particle: particle
    });
  },

  select: function(id) {
    AppDispatcher.dispatch({
      actionType: ParticleConstants.PARTICLE_SELECT,
      id: id
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: ParticleConstants.PARTICLE_DESTROY,
      id: id
    });
  },

};

export default ParticleActions;
