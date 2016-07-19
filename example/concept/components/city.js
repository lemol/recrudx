import React, { Component } from 'react'

export class EditForm extends Component {
  render() {
    const { name, country, province } = this.props.fields
    return (
      <div>
        <h1>This is a custom edit city form</h1>
        <div>
          Name: <input {...name} />
        </div>
        <div>
          Country: <Control type="dropdown" {...country} />
        </div>
        <div>
          Province: <Control type="dropdown" {...province} />
        </div>
      </div>
    )
  }
}
