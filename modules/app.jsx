import "babel/polyfill"
import React from "react"

import Main from './containers/main'

import "./stylesheet.scss"

React.initializeTouchEvents(true)

React.render(<Main />, document.querySelector("#app"))
