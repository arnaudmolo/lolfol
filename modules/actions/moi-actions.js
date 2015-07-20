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

    const {counter, increasing} = getState().counter;

    if (increasing == true && counter <= 2) {
      return dispatch(increment());
    }

    if (counter <= 0) {
      return dispatch(increment());
    }

    return dispatch(decrement());
  }
}
