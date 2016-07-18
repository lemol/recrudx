import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import { Form, Col, FormGroup, ControlLabel, InputGroup, FormControl, Button  } from 'react-bootstrap'

class CreateForm extends Component {
  componentWillMount() {
    const { schema: { sources }, fetchSource } = this.props
    for(let source in sources) {
      fetchSource(source)
    }
  }

  handleFormChange(event) {
    const { name, value } = event.target
    const { updateParams } = this.props
    updateParams({ [name]: value })
  }

  render() {
    const {
      fields,
      schema,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit} onChange={::this.handleFormChange}>
        {schema.fields.map(::this.renderControlGroup)}
        <Button type="submit" style={{ visibility: 'hidden' }}>OK</Button>
      </Form>
    )
  }

  renderControlGroup(control, i) {
    const field = this.props.fields[control.name]
    const { display } = control

    return (
      <FormGroup key={i}>
        <Col componentClass={ControlLabel} sm={2}>
          {display}
        </Col>
        <Col sm={6}>
          {this.renderControl(field, control)}
        </Col>
      </FormGroup>
    )
  }

  renderControl(field, control) {
    switch(control.type) {
      case 'DROPDOWN':
        const { sources } = this.props
        const { source } = control
        const list = sources[source]
        return (
          <FormControl componentClass="select" {...field}>
            {list.map((e, i) => {
              return <option key={i} value={e.id}>{e.nome}</option>
            })}
          </FormControl>
        )
      default:
        return <FormControl type="input" {...field}/>
    }
  }
}

export function editForm(options) {
  const { schema, type, namespace, apiActions, componentActions } = options
  const fields = options.schema.fields.map(s => s.name)

  const mapStateToProps = (state) => Object.assign({
    initialValues: state[namespace][type].edit.item,
    sources: state[namespace][type].edit.sources,
    params: state[namespace][type].edit.params
  })

  const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSubmit: apiActions.update,
    fetchSource: componentActions.fetchSource,
    updateParams: componentActions.updateParams
  }, dispatch)

  const mergeProps = (stateProps, dispatchProps) => Object.assign({
    ...stateProps,
    onSubmit: dispatchProps.onSubmit.bind(null, (stateProps.initialValues || {}).id),
    fetchSource: dispatchProps.fetchSource.bind(null, 'edit', schema),
    updateParams: dispatchProps.updateParams.bind(null, 'edit', schema)
  })


  const form = `${namespace}_${type}_editForm`

  const ReduxForm = reduxForm({
    form,
    fields,
    schema
  })(EditForm)

  const Connected = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ReduxForm)

  return Connected
}
