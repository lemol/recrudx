import axios from 'axios'

function fetchSource(options, view, schema2, source) {
  const { namespace, type, schema } = options

  return (dispatch, getState) => {
    const { requiredParams, fetch } = schema2.sources[source]
    const { params } = getState()[namespace][type][view]

    const incomplete = requiredParams.some(p => params[p] == null)

    const buildType = (tail) => `${namespace}/${type}/${view}/{source:${source}}/${tail}`

    if(incomplete) {
      return dispatch({
        type: buildType('FETCH_FAILURE'),
        payload: { msg: 'Insuficient params.' }
      })
    }

    const { url, query } = fetch(params)
    dispatch({
      type: buildType('FETCH_REQUEST')
    })
    return axios.get(url, { params: query }).then(res => dispatch({
      type: buildType('FETCH_SUCCESS'),
      payload: res.data,
      header: { type, view, namespace, source, schema }
    })).catch(err => dispatch({
      type: buildType('FETCH_FAILURE'),
      payload: err
    }))

  }
}

function updateParams(options, view, schema2, updateObj) {
  const { type, namespace, schema } = options
  const params = _.keys(updateObj)
  const buildType = (tail) => `${namespace}/${type}/${view}/${tail}`

  return dispatch => {
    dispatch({
      type: buildType('UPDATE_PARAMS'),
      payload: updateObj,
      header: { schema, type, view, namespace }
    })

    const { sources } = schema2
    for(let sourceName in sources) {
      const source = sources[sourceName]
      if(source.requiredParams.some(r => params.some(p => r===p))) {
        dispatch(fetchSource(options, view, schema2, sourceName))
      }
    }

    if(view === 'list') {
      dispatch(fetchList(options))
    }
  }
}

function updateListParams(options, view, schema2, updateObj) {
  const { type, namespace, schema, container } = options
  const params = _.keys(updateObj)

  return dispatch => {
    dispatch({
      type: `${namespace}/${type}/UPDATE_LIST_PARAMS`,
      payload: updateObj,
      header: { schema }
    })

    const { sources } = schema2
    for(let sourceName in sources) {
      const source = sources[sourceName]
      if(source.requiredParams.some(r => params.some(p => r===p))) {
        dispatch(fetchSource(options, view, schema2, sourceName))
      }
    }

    dispatch(fetchList(options))
  }
}

function fetchList(options) {
  const { type, fetchList, namespace, schema } = options

  return (dispatch, getState) => {
    const { params } = getState()[namespace][type].list
    const { url, query } = fetchList(params)

    const buildType = (tail) => `${namespace}/${type}/${tail}`
    const incomplete = _.values(query).some(q => q == undefined)

    if(incomplete) {
      return dispatch({
        type: buildType('FETCH_FAILURE'),
        payload: { msg: 'Insuficient params.' }
      })
    }

    dispatch({
      type: `${namespace}/${type}/FETCH_LIST_REQUEST`
    })
    return axios.get(url, { params: query }).then(res => dispatch({
      type: `${namespace}/${type}/FETCH_LIST_SUCCESS`,
      payload: res.data,
      header: { schema }
    })).catch(err => dispatch({
      type: `${namespace}/${type}/FETCH_LIST_FAILURE`,
      payload: err
    }))
  }
}

function fetchDetails(options, id) {
  const { type, fetchDetails, namespace, schema, container } = options

  return (dispatch, getState) => {
    const { params } = getState()[namespace][type].details
    const { url, query } = fetchDetails(id, params)

    dispatch({
      type: `${namespace}/${type}/GET_DETAILS_REQUEST`
    })
    return axios.get(url, { params: query }).then(res => dispatch({
      type: `${namespace}/${type}/GET_DETAILS_SUCCESS`,
      payload: res.data,
      header: { schema }
    })).catch(err => dispatch({
      type: `${namespace}/${type}/GET_DETAILS_FAILURE`,
      payload: err
    }))
  }
}

function openEditModal(options, id) {
  const { type, fetchEdit, namespace, schema, container } = options
  const buildType = (tail) => `${namespace}/${type}/${tail}`


  return dispatch => {
    if(id == undefined) {
      return dispatch({
        type: buildType('OPEN_CREATE_MODAL'),
        header: { namespace, type, schema, view: 'edit' }
      })
    }

    const { url } = fetchEdit(id)

    dispatch({
      type: buildType('OPEN_EDIT_MODAL_REQUEST')
    })
    return axios.get(url).then(res => dispatch({
      type: buildType('OPEN_EDIT_MODAL_SUCCESS'),
      payload: res.data,
      header: { schema }
    })).catch(err => dispatch({
      type: buildType('OPEN_EDIT_MODAL_FAILURE'),
      payload: err
    }))
  }
}

function closeEditModal(options) {
  const { type, namespace, schema } = options
  return {
    type: `${namespace}/${type}/CLOSE_EDIT_MODAL`,
    header: { schema }
  }
}

export function createActionsCreators(options) {
  return {
    openEditModal: openEditModal.bind(null, options),
    closeEditModal: closeEditModal.bind(null, options),
    updateListParams: updateListParams.bind(null, options),
    updateParams: updateParams.bind(null, options),
    fetchDetails: fetchDetails.bind(null, options),
    fetchSource: fetchSource.bind(null, options),
    fetchList: fetchList.bind(null, options)
    //openCreateModal: openCreateModal.bind(null, options),
    //openDeleteModal: opendDeleteModal.bind(null, options)
  }
}

