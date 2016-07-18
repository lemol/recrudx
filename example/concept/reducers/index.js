import { combineReducers } from 'redux'
import { crudReducers } from 'recrudx'
import * as schemas from '../schemas'

const reduces = crudReducers({ schemas })

export default combineReducers({
  ...reducers
})
