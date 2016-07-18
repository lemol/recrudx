import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

const ListPage = options => class ListPage extends Component {

  static title = options.title

  componentWillMount() {
    const { schema: { sources } } = options
    const { fetchSource, fetchList } = this.props

    if(_.keys(sources).length === 0) {
      return fetchList()
    }

    for(let source in sources) {
      fetchSource(source)
    }
  }

  render() {
    return (
      <div>
        <options.List
          items={_.values(this.props.items)}
          openEditModal={this.props.openEditModal}
          openCreateModal={this.props.openCreateModal}
        />
      </div>
    )
  }
}

export function listPage(options) {

  const { schema, type, namespace, componentActions } = options

  const mapStateToProps = (state) =>  {
    return Object.assign({
      items: state[namespace][type].list.items
    })
  }

  const mapDispatchToProps = (dispatch) => bindActionCreators({
    openEditModal: componentActions.openEditModal,
    openCreateModal: componentActions.openCreateModal,
    fetchSource: componentActions.fetchSource,
    fetchList: componentActions.fetchList
  }, dispatch)

  const mergeProps = (stateProps, dispatchProps) => Object.assign({
    ...stateProps,
    openEditModal: dispatchProps.openEditModal,
    openCreateModal: dispatchProps.openCreateModal,
    fetchSource: dispatchProps.fetchSource.bind(null, 'list', schema),
    fetchList: dispatchProps.fetchList.bind(null, 'list', schema)
  })

  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListPage(options))
}
