import { Schema, FieldType } from 'recrudx'

export default Schema('City', {
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
        edit: FieldType.SELECT({
          source: 'country'
        })
      }
    },
    {
      name: 'province',
      display: 'Province',
      type: {
        details: FieldType.STRING(),
        edit: FieldType.SELECT({
          source: 'province',
          requires: ['country']
        })
      }
    }
  ]
})

