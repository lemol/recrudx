import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { editForm } from './EditForm'
import { Modal, Table, Row, Col, FormGroup, ControlLabel, InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap'

const EditModal = options => class EditModal extends Component {
  render() {
    const { EditForm } = this.props
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Editar {options.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm ref="form" {...this.props}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.submitForm}>OK</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export function editModal(options, view) {
  const { type, namespace, componentActions } = options
  const EditForm = editForm(options)

  const mapStateToProps = (state) => Object.assign({
    show: state[namespace][type].edit.modalVisible,
    EditForm
  })

  const mapDispatchToProps = (dispatch) => bindActionCreators({
    onHide: componentActions.closeEditModal,
    submitForm: () => Object.assign({
      type: 'redux-form/START_SUBMIT',
      form: `${namespace}_${type}_edit_form`
    })
  }, dispatch)

  return connect(mapStateToProps, mapDispatchToProps)(EditModal(options))
}
