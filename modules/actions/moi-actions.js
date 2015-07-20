import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './../constants/action-types';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function circular() {
  return (dispatch, getState) => {

    const {counter}  = getState();
    const increasing = counter.get('increasing');
    const count      = counter.get('counter');

    if (increasing === true && count <= 2) {
      return dispatch(increment());
    }

    if (count <= 0) {
      return dispatch(increment());
    }

    return dispatch(decrement());
  }
}
