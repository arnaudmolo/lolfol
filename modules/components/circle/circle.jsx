import style from "./style.scss";
import Actions from "../../actions/particle-actions";
import React from "react";
import cx from "classnames";

export default React.createClass({
  select: function(e) {
    e.stopPropagation();
    if (this.props.hidden) return;
    Actions.select(this.props.id);
  },
  render: function() {

    let classes = cx({
      hidden: this.props.hidden,
      [style.circle]: true
    });

    const inlineStyle = {
      fill: this.props.color
    };

    return (
      <circle
        onClick={this.select}
        className={classes}
        style={inlineStyle}
        cx={this.props.position.x}
        cy={this.props.position.y}
        r={this.props.value}
      />
    );
  }
});
