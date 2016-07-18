import { arrayOf, normalize } from 'normalizr'
import _ from 'lodash'

function reducer(options, state = {}, action) {
  const { namespace } = options
  const schema = action.header ? action.header.schema : null
  const container = action.header ? action.header.container : null

  if(schema == null) {
    return state
  }

  if(!action.type.startsWith(`${namespace}/`)) {
    return state
  }

  const entityName = schema._key

  const buildType = (tail) => `${namespace}/${schemaName}/${tail}`

  switch(action.type) {
    case buildType('OPEN_EDIT_MODAL_SUCCESS'):

  }

  let schemaType = null

  if(action.type.endsWith('_SUCCESS')) {
    if(action.type.startsWith(`${namespace}/FETCHALL`)) {
      schemaType = arrayOf(schema)
    }
    else if(
      action.type.startsWith(`${namespace}/FETCH`)
      || action.type.startsWith(`${namespace}/CREATE`)
      || action.type.startsWith(`${namespace}/UPDATE`)
    ) {
      schemaType = arrayOf(schema)
    }
  }

  if(schemaType == null) {
    return state
  }

  const normalized = normalize(action.payload, schemaType)
  let entities = normalized.entities

  if (container) {
    const elements = normalized.entities[entityName]
    const result = {}

    const list = Object.keys(elements).map(key => {
      const value = elements[key]
      const containerKey = value[container]
      const result = {
        [containerKey]: {
          [key]: value
        }
      }
      return result
    })

    entities = {
      [entityName]: list.reduce((acc, act) => {
        return _.merge({}, acc, act)
      }, {})
    }
  }

  return _.merge({}, state, entities)
}

export function createCrudReducer(options) {
  return reducer.bind(null, options)
}
