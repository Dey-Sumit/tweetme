import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import { Layout } from './Version_2/Layout.comp'

function App(props) {
  return (
    <Router>
      <Layout {...props} />
    </Router>
  )

}

export default App;

{/* <ColorContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/littlehome" exact component={LittleHome} />
      </ColorContextProvider> */}