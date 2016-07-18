import { arrayOf, normalize } from 'normalizr'
import _ from 'lodash'
import { arrayToMap } from '../../core/utils'

function reducer(options, state = {}, action) {
  const { namespace } = options
  const schema = action.header ? action.header.schema : null
  const source = action.header ? action.header.source : null
  const view = action.header ? action.header.view : null

  if(schema == null) {
    return state
  }

  const entityName = schema._key
  const type = entityName
  const buildType = (tail) => `${namespace}/${entityName}/${tail}`
  const buildType2 = (view, tail) => `${namespace}/${type}/${view}/{source:${source}}/${tail}`
  const buildType3 = (view, tail) => `${namespace}/${type}/${view}/${tail}`

  switch(action.type) {
    case buildType2('list', 'FETCH_SUCCESS'):
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          list: {
            ...state[entityName].list,
            sources: {
              ...state[entityName].list.sources,
              [source]: action.payload
            }
          }
        }
      }
    case buildType2('edit', 'FETCH_SUCCESS'):
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          edit: {
            ...state[entityName].edit,
            sources: {
              ...state[entityName].edit.sources,
              [source]: action.payload
            }
          }
        }
      }
    case buildType3(view, 'UPDATE_PARAMS'):
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          [view]: {
            ...state[entityName][view],
            params: {
              ...state[entityName][view].params,
              ...action.payload
            }
          }
        }
      }
    case buildType('UPDATE_LIST_PARAMS'):
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          list: {
            ...state[entityName].list,
            params: {
              ...state[entityName].list.params,
              ...action.payload
            }
          }
        }
      }
    case buildType('FETCH_LIST_SUCCESS'):
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          list: {
            ...state[entityName].list,
            items: arrayToMap(action.payload)
          }
        }
      }
    case buildType('GET_DETAILS_SUCCESS'):
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          details: {
            ...state[entityName].details,
            item: action.payload
          }
        }
      }
    case buildType('OPEN_CREATE_MODAL'):
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          edit: {
            ...state[entityName].edit,
            modalVisible: true,
            item: {}
          }
        }
      }
    case buildType('OPEN_EDIT_MODAL_SUCCESS'):
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          edit: {
            ...state[entityName].edit,
            modalVisible: true,
            item: action.payload
          }
        }
      }
    case buildType('CLOSE_EDIT_MODAL'):
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          edit: {
            ...state[entityName].edit,
            modalVisible: false,
            item: null
          }
        }
      }
    default:
      return state
  }

}

export function createComponentsReducer(options) {
  return reducer.bind(null, options)
}
