import React, { createContext, useReducer, Reducer, Dispatch } from 'react'
import reducer from './reducer'

interface Actions {
  type: string;
  value: any;
}

interface IndexRow {
  [index: string]: string[]
}

export interface Table {
  [name: string]: {
    errors: string | null;
    values: IndexRow;
  }
}

export interface ContextProps {
  state: Table;
  dispatch: Dispatch<Actions>;
}

const initialState: Table = {
  'Original Dataset': {
    errors: null,
    values: {
      'Product': [ 'Apple iPhone 6s', 'Samsung Galaxy S8', 'Huawei P9'],
      'Color': [ 'Stonegrey', 'Midnight Black', 'Mystic Silver'],
      'Price': [ 'CHF 769', 'CHF 569', 'CHF 272'],
    }
  }
}

export const Context = createContext({} as ContextProps)

export default function Store(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  )



}