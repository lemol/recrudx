import React, { Component } from 'react'
import { Panel, Grid, Table, Row, Col, FormGroup, ControlLabel, InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap'

export const details = options => class Details extends Component {
  render() {
    const { item } = this.props

    if(!item) {
      return null
    }

    const openEditModal = this.props.openEditModal || new Function()
    const callDelete = this.props.callEdit || new Function()

    return (
      <div>
        <Grid>
          {options.schema.fields.map(::this.renderControl)}
        </Grid>
        <div>
          <a href="javascript:void(0)" onClick={openEditModal.bind(null, item.id)}>
            Editar
          </a> |&nbsp;
          <a href="javascript:void(0)" onClick={callDelete.bind(null, item.id)}>
            Eliminar
          </a>
        </div>
      </div>
    )
  }

  renderControl(control, i) {
    const { display, name } = control
    const { item } = this.props
    const value = item[name]

    return (
      <Row key={i}>
        <Col sm={1}>
          {display}
        </Col>
        <Col sm={6}>
          <b>{value}</b>
        </Col>
      </Row>
    )
  }
}

