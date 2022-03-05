import React from 'react'
import "./App.css"
import {  Route, BrowserRouter as Router } from 'react-router-dom';
import List from "./Components/List"
import Summary from "./Components/Summary"

const App = () => {
  return (
    <>
      <Router>
          <Route exact path='/'><List/></Route>
          <Route path='/summary/:id'><Summary/></Route>
      </Router>
    </>
  )
}

export default App
