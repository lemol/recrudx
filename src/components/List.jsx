import React, { Component } from 'react'
import { Link } from 'react-router'
import { Table, Row, Col, Button, Glyphicon } from 'react-bootstrap'

export const list = options => class List extends Component {
  render() {
    const openEditModal = this.props.openEditModal || new Function()

    return (
      <div>
        <div>
          <a href="javascript:void(0)" onClick={openEditModal.bind(null, null)}>
            Novo
          </a>
        </div>
        <div>
          <Table className="table-hover">
            <thead>
              {this.renderHeader()}
            </thead>
            <tbody>
              {this.props.items.map(::this.renderItem)}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }

  renderHeader() {
    return (
      <tr>
        {options.schema.fields.map((o, i) => <th key={i}>{o.display}</th>)}
        <th></th>
      </tr>
    )
  }

  renderItem(item) {
    const openEditModal = this.props.openEditModal || new Function()
    const callDelete = this.props.callEdit || new Function()

    return (
      <tr key={item.id}>
        {options.schema.fields.map((o, i) => <td key={i}>{item[o.name]}</td>)}
        <td>
          <Link to={`${options.basePath}/${item.id}`}>Detalhes</Link> |&nbsp;
          <a href="javascript:void(0)" onClick={openEditModal.bind(null, item.id)}>
            Editar
          </a> |&nbsp;
          <a href="javascript:void(0)" onClick={callDelete.bind(null, item.id)}>
            Eliminar
          </a>
        </td>
      </tr>
    )
  }
}
