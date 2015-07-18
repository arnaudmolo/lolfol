import React from "react/addons";

import Actions from "../actions/particle-actions";
import ParticleStore from "../stores/particle-store";
import Circle from "./circle/circle";

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function getParticlesState() {
  return {
    allParticles: ParticleStore.getAll(),
    selected: ParticleStore.getSelected(),
    filtered: ParticleStore.getFiltered(),
  };
}

export default React.createClass({
  getInitialState: function() {
    return getParticlesState();
  },

  componentDidMount: function() {
    ParticleStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    ParticleStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState(getParticlesState());
  },

  unselect: function() {
    Actions.select(null);
  },

  render: function() {

    const circles = [];

    for (let key in this.state.allParticles) {
      const particle = this.state.allParticles[key];
      const hidden = (
        (this.state.selected !== particle.id &&
        this.state.selected) ||
        !this.state.filtered[key]
      );
      circles.push(
        <Circle key={particle.id} hidden={hidden} {...particle}></Circle>
      );
    }

    return (
      <svg
        width="100%"
        height="100%"
        onClick={this.unselect}
      >
        <ReactCSSTransitionGroup transitionName="circle">
          {circles}
        </ReactCSSTransitionGroup>
      </svg>
    );
  },

});
