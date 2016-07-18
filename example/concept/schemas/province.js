import { Schema, FieldType } from 'recrudx'

export default Schema('Province', {
  fields: [
    {
      name: 'name',
      display: 'Name',
      type: FieldType.STRING()
    },
    {
      name: 'country',
      display: 'Country',
      type: {
        details: FieldType.STRING(),
        edit: FieldType.SELECT()
      }
    }
  ]
})

