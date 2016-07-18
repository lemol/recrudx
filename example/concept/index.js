import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import axios from 'axios'

import routes from './routes'
import configureStore from './store/configureStore'

let DevTools = undefined

if (process.env.NODE_ENV === 'development') {
  DevTools = require('./containers/DevTools').default
}

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

axios.defaults.baseURL = 'http://127.0.0.1:3000/api'

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        {routes}
      </Router>
      {process.env.NODE_ENV === 'development' && !window.devToolsExtension && <DevTools />}
    </div>
  </Provider>
  , document.getElementById('react-root')
)
