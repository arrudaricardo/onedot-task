import React, {createContext, useReducer, Reducer, Dispatch} from 'react'
import reducer from './reducer'

interface Actions {
    type: string;
    value: any;
}

interface ContextProps {
  state: any;
  dispatch: Dispatch<Actions>;
}

interface IndexRow {
  index: string;
  key: string;
  value: Row[]
}

interface Row {
  key: string;
  value: string | number
}

export interface Table {
  name: string;
  values: IndexRow;
}

const initialState: Table = {
  name: 'Original Dataset',
  values:{
    index: 'Product',
    key: 'Apple iPhone 6s',
    value: [{key:'color', value:'Stonegrey'},{key: 'Price', value:'CHF 769'}]
  }
}


const AppContext = createContext({} as ContextProps)

export default function Store(props:any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
    {props.children}
    </AppContext.Provider>
  )
  


}