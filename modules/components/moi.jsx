import React, { Component, PropTypes } from 'react';

export default class Moi extends Component {
  
  static PropTypes = {
    face: PropTypes.number.isRequired
  }

  render() {
    return (
      <div>Kouk</div>
    );
  }

}
