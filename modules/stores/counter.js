import Immutable from 'immutable';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './../constants/action-types';

const initialState = Immutable.fromJS({
  counter: 0,
  increasing: true
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state.merge({
        counter: state.get('counter') + 1,
        increasing: true
      });
    case DECREMENT_COUNTER:
      return state.merge({
        counter: state.get('counter') - 1,
        increasing: false
      });
    default:
      return state;
  }
}


// <Circle style={{...style, ...left}} />
// <Bezier style={{start: left, end: right}} />
// <Circle style={{...style, ...right}} />
