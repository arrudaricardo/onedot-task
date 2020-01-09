import {Table} from './Store'

export default function reducer(state: object, action: any): Table {

  Object.freeze(state)
  const oldState = Object.assign({}, state)
  switch (action.type) {
    case 'CREATE DICTIONATY':
      return { ...oldState, ...action.value }

    default:
      throw Error("Specify Action");
  }

}