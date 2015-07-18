import AppDispatcher from '../dispatcher/app-dispatcher';
import ParticleConstants from '../constants/particle-constants';
import filtersContants from "../constants/filters-constants";

const FiltersActions = {
  select: function(id) {
    AppDispatcher.dispatch({
      actionType: "SELECT_FILTER",
      fn: filtersContants[id].fn
    });
  },
};

export default FiltersActions;
