import { Schema, FieldType } from 'recrudx'

export default Schema('Country', {
  fields: [
    {
      name: 'name',
      type: FieldType.STRING
    },
    {
      name: 'iso',
      type: FieldType.STRING
    }
  ]
})
