import "babel/polyfill"
import React from "react"

import Main from './containers/main'

import "./stylesheet.scss"

React.render(<Main />, document.querySelector("#app"))
