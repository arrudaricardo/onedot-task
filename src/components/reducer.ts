import {Table, Row} from './Store'


export default function reducer(state: object, action: any): Table {

  Object.freeze(state)
  const oldState: Table = Object.assign({}, state)
  switch (action.type) {
    case 'UPDATE':
      return { ...oldState, ...action.value }

    case 'ADDROW':
      const table: string = action.value.table
      const newData: Row = action.value.newData
      oldState[table].data.push(newData)
      return oldState 

      break

      case 'CREATE':
        const name = action.value
        oldState[name] = {
          errors: null,
          columns: [{ title: 'Product', field: 'Product' }, { title: 'Color', field: 'Color' }, { title: 'Price', field: 'Price' }],
          data: []
        }
        return oldState
        break;

    default:
      throw Error("Specify Action");
  }

}