import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import asyncMiddleware from 'redux-async'
import rootReducer from '../reducers';

import * as state from './initialState'

export default function configureStore(initialState = state) {

  const router = routerMiddleware(history)
  const middlewares = [thunk, asyncMiddleware, router]

  if(process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger')
    const logger = createLogger()
    middlewares.push(logger)
  }

  const enhancements = [
    applyMiddleware(...middlewares)
  ]

  if(process.env.NODE_ENV === 'development') {
    if(window.devToolsExtension) {
      enhancements.push(window.devToolsExtension())
    }
    else {
      const DevTools = require('../containers/DevTools').default
      enhancements.push(DevTools.instrument())
    }
  }

  const enhancer = compose(...enhancements)

  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
