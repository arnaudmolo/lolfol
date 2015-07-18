import "babel/polyfill";
import React from "react";
import d3 from "d3";

import filtersContants from "./constants/filters-constants";
import style from "./_stylesheet.scss";
import ParticleStore from "./stores/particle-store";

import Visualisation from "./components/visualisation";
import Info from "./components/info";
import Filters from "./components/filters";


React.render(<Visualisation/>, document.querySelector(".visualisation-wrapper"));
React.render(<Info/>, document.querySelector(".info-wrapper"));
React.render(<Filters filters={filtersContants}/>, document.querySelector(".filters-wrapper"));

const marge = 100
const data = [];
for(var i=0; i<500; i++) {
  data.push({
    value: 5+(Math.random()*40),
    color: '#'+Math.floor(Math.random()*16777215).toString(16),
    position: {
      x: marge+(Math.random()*(window.innerWidth-(marge*2))),
      y: marge+(Math.random()*(window.innerHeight-(marge*2))),
    }
  });
};

const colorScale = d3
  .scale
  .linear()
  .domain(d3.extent(data, (d) => d.value))
  .range(["#000a4f", "#ff5112"]);

data
  .map(function(d) {
    d.color = colorScale(d.value);
    return d;
  }).sort((a,b) => b.value - a.value);

ParticleStore.setData(data);
