import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './../constants/action-types';

export default function counter(state = {
  counter: 0, increasing: true
}, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        counter: state.counter + 1,
        increasing: true
      }
    case DECREMENT_COUNTER:
      return {
        counter: state.counter - 1,
        increasing: false
      }
    default:
      return state;
  }
}
