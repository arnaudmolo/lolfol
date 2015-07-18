import React from "react/addons";

import Actions from "../actions/particle-actions";
import ParticleStore from "../stores/particle-store";

function getParticlesState() {
  return {
    allParticles: ParticleStore.getAll(),
    selected: ParticleStore.getSelected()
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

  renderInfo: function() {
    const selected = this.state.allParticles[this.state.selected];
    if (!selected) return "";

    const infoStyle = {
      width: "100%",
      display: "inline-block"
    };

    return [
      <span style={infoStyle}>ID    : {selected.id}</span>,
      <span style={infoStyle}>VALUE : {selected.value}</span>,
      <span style={infoStyle}>COLOR : {selected.color}</span>
    ]
  },

  render: function() {
    return (
      <div className={"info"}>
        {this.renderInfo()}
      </div>
    );
  },

});
