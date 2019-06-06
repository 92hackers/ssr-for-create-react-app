import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"

import './index.css'

import App from './modules/App'
import configureStore from './store/configureStore'

const store = configureStore(window.REDUX_STATE || {})

const AppBundle = (
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>
)

ReactDOM.hydrate(AppBundle, document.getElementById('root'));

