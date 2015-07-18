import React from "react/addons";

import Actions from "../actions/filters-actions";

export default React.createClass({
  selectFilter: function(e) {
    Actions.select(e.target.value);
  },
  render: function() {

    const options = [];

    for(let key in this.props.filters) {
      options.push(
        <option key={key} value={key}>{this.props.filters[key].name}</option>
      );
    }

    return (
      <select
        ref="select"
        name="select"
        onChange={this.selectFilter}
      >
        {options}
      </select>
    );
  },
});
