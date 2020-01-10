import React, { createContext, useReducer, Reducer, Dispatch } from 'react'
import reducer from './reducer'
import {Column} from 'material-table';

interface Actions {
  type: string;
  value: any;
}


export interface Row {
  [field: string]: string | number
}

export interface Table {
  [name: string]: {
    errors: string | null;
    columns: Array<Column<Row>>;
    data: Row[];
  }
}

export interface ContextProps {
  state: Table;
  dispatch: Dispatch<Actions>;
}

const initialState: Table = {
  'Original Dataset': {
    errors: null,
    columns: [{ title: 'Product', field: 'Product' }, { title: 'Color', field: 'Color' }, { title: 'Price', field: 'Price' }],
    data: [{ Product: 'Apple iPhone 6s', Color: 'Stonegrey', Price: 'CHF 769' },
    { Product: 'Samsung Galaxy S8', Color: 'Midnight Black', Price: 'CHF 569' },
    { Product: 'Huawei P9 Mystic ', Color: 'Silver ', Price: 'CHF 272' }
    ]
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