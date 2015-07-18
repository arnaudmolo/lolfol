import "babel/polyfill";
import React from "react";
import d3 from "d3";

import style from "./stylesheet.scss";

import Main from './components/main';

console.log('kouk', Main);

React.render(<Main />, document.querySelector("#app"));
