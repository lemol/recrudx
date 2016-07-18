import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import { Form, Panel, Table, Row, Col, FormGroup, ControlLabel, InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap'

class CreateForm extends Component {
  render() {
    const {
      fields,
      options,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        {options.map(::this.renderControl)}
        <Button type="submit">OK</Button>
      </Form>
    )
  }

  renderControl(control, i) {
    const { fields } = this.props
    const field = fields[control.name]
    const { display } = control

    return (
      <FormGroup key={i}>
        <Col componentClass={ControlLabel} sm={2}>
          {display}
        </Col>
        <Col sm={6}>
          <FormControl type="input" {...field}/>
        </Col>
      </FormGroup>
    )
  }
}

export function createForm(options) {
  return reduxForm(options)(CreateForm)
}
