import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

const DetailsPage = options => class DetailsPage extends Component {

  static title = options.title

  fetchDetails() {
    const { fetchDetails } = this.props
    fetchDetails()
  }

  componentWillMount() {
    this.fetchDetails()
  }

  componentWillUpdate(nextProps) {
    if(nextProps.params.id !== this.props.params.id) {
      this.fetchDetails()
    }
  }

  render() {
    return (
      <div>
        <options.Details
          item={this.props.item}
          openEditModal={this.props.openEditModal}
        />
      </div>
    )
  }
}

export function detailsPage(options) {

  const { type, namespace, componentActions } = options

  const mapStateToProps = state => Object.assign({
    item: state[namespace][type].details.item
  })

  const mapDispatchToProps = dispatch => bindActionCreators({
    openEditModal: componentActions.openEditModal,
    fetchDetails: componentActions.fetchDetails
  }, dispatch)

  const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({
    ...ownProps,
    ...dispatchProps,
    ...stateProps,
    fetchDetails: dispatchProps.fetchDetails.bind(null, ownProps.params.id)
  })

  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailsPage(options))
}
