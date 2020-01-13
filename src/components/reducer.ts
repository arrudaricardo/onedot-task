import {Table, Row} from './Store'


export default function reducer(state: object, action: any): Table {

  Object.freeze(state)
  const oldState: Table = Object.assign({}, state)
  switch (action.type) {
    case 'UPDATEROW':
      let tableName: string = action.value.table 
      let index: number = action.value.index

      oldState[tableName].data[index] = action.value.newData

      return oldState

    case 'ADDROW':
      const table: string = action.value.table
      const newData: Row = action.value.newData
      oldState[table].data.push(newData)
      return oldState 

      case 'CREATE':
        const name = action.value
        oldState[name] = {
          errors: null,
          columns: [{ title: 'Product', field: 'Product' }, { title: 'Color', field: 'Color' }, { title: 'Price', field: 'Price' }],
          data: []
        }
        return oldState
      case 'DELETEROW':

        oldState[action.value.table].data.splice(action.value.index, 1)

        return oldState

    default:
      throw Error("Specify Action");
  }

}