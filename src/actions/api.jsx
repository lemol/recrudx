import axios from 'axios'

function fetchAll(options, params) {
  const { type, url, namespace, schema, container } = options

  return dispatch => {
    dispatch({
      type: `${namespace}/FETCHALL_${type}_REQUEST`
    })
    axios.get(`${url}`, { params }).then(res => {
      dispatch({
        type: `${namespace}/FETCHALL_${type}_SUCCESS`,
        payload: res.data,
        header: { schema, container }
      })
    }).catch(err => dispatch({
      type: `${namespace}/FETCHALL_${type}_FAILURE`,
      payload: err
    }))
  }
}


function fetch(options, id) {
  const { type, url, namespace, schema, container } = options
  const sep = url[url.length-1] === '/' ? '' : '/'
  const fetchUrl = url + sep + id

  return dispatch => {
    dispatch({
      type: `${namespace}/FETCH_${type}_REQUEST`
    })
    return axios.get(`${fetchUrl}`).then(res => dispatch({
      type: `${namespace}/FETCH_${type}_SUCCESS`,
      payload: res.data,
      header: { schema, container }
    })).catch(err => dispatch({
      type: `${namespace}/FETCH_${type}_FAILURE`,
      payload: err
    }))
  }
}

function create(options, data) {
  const { type, url, namespace, schema, container } = options

  return dispatch => {
    dispatch({
      type: `${namespace}/CREATE_${type}_REQUEST`
    })
    return axios.post(`${url}`, data).then(res => dispatch({
      type: `${namespace}/CREATE_${type}_SUCCESS`,
      payload: res.data,
      header: { schema, container }
    })).catch(err => dispatch({
      type: `${namespace}/CREATE_${type}_FAILURE`,
      payload: err
    }))
  }
}

function update(options, id, data) {

  if(id == undefined) {
    return create(options, data)
  }

  const { type, url, namespace, schema, container } = options
  const sep = url[url.length-1] === '/' ? '' : '/'
  const fetchUrl = url + sep + id

  return dispatch => {
    dispatch({
      type: `${namespace}/UPDATE_${type}_REQUEST`
    })
    return axios.put(`${fetchUrl}`, data).then(res => dispatch({
      type: `${namespace}/UPDATE_${type}_SUCCESS`,
      payload: res.data,
      header: { schema, container }
    })).catch(err => dispatch({
      type: `${namespace}/UPDATE_${type}_FAILURE`,
      payload: err
    }))
  }
}

function remove(options, id) {
  const { type, url, namespace, schema } = options
  const sep = url[url.length-1] === '/' ? '' : '/'
  const fetchUrl = url + sep + id

  return dispatch => {
    dispatch({
      type: `${namespace}/DELETE_${type}_REQUEST`
    })
    return axios.del(`${fetchUrl}`).then(res => dispatch({
      type: `${namespace}/DELETE_${type}_SUCCESS`,
      payload: res.data
    })).catch(err => dispatch({
      type: `${namespace}/DELETE_${type}_FAILURE`,
      payload: err
    }))
  }
}

export function createActionsTypes(options) {

  const namespace = options.namespace.toUpperCase()
  const { type } = options

  return {
    [`${upperNamespace}_FETCHALL_${type}_REQUEST`]: `${namespace}/FETCHALL_${type}_REQUEST`,
    [`${upperNamespace}_FETCHALL_${type}_SUCCESS`]: `${namespace}/FETCHALL_${type}_SUCCESS`,
    [`${upperNamespace}_FETCHALL_${type}_FAILURE`]: `${namespace}/FETCHALL_${type}_FAILURE`,
    [`${upperNamespace}_FETCH_${type}_REQUEST`]: `${namespace}/FETCH_${type}_REQUEST`,
    [`${upperNamespace}_FETCH_${type}_SUCCESS`]: `${namespace}/FETCH_${type}_SUCCESS`,
    [`${upperNamespace}_FETCH_${type}_FAILURE`]: `${namespace}/FETCH_${type}_FAILURE`,
    [`${upperNamespace}_CREATE_${type}_REQUEST`]: `${namespace}/CREATE_${type}_REQUEST`,
    [`${upperNamespace}_CREATE_${type}_SUCCESS`]: `${namespace}/CREATE_${type}_SUCCESS`,
    [`${upperNamespace}_CREATE_${type}_FAILURE`]: `${namespace}/CREATE_${type}_FAILURE`,
    [`${upperNamespace}_UPDATE_${type}_REQUEST`]: `${namespace}/UPDATE_${type}_REQUEST`,
    [`${upperNamespace}_UPDATE_${type}_SUCCESS`]: `${namespace}/UPDATE_${type}_SUCCESS`,
    [`${upperNamespace}_UPDATE_${type}_FAILURE`]: `${namespace}/UPDATE_${type}_FAILURE`,
    [`${upperNamespace}_REMOVE_${type}_REQUEST`]: `${namespace}/REMOVE_${type}_REQUEST`,
    [`${upperNamespace}_REMOVE_${type}_SUCCESS`]: `${namespace}/REMOVE_${type}_SUCCESS`,
    [`${upperNamespace}_REMOVE_${type}_FAILURE`]: `${namespace}/REMOVE_${type}_FAILURE`,
  }
}

export function createActionsCreators(options) {
  return {
    fetchAll: fetchAll.bind(null, options),
    fetch: fetch.bind(null, options),
    create: create.bind(null, options),
    update: update.bind(null, options),
    remove: remove.bind(null, options),
  }
}

