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

export type TableData  = {
    errors: string | null;
    columns: Array<Column<Row>>;
    data: Row[];
}

export interface Table {
  [name: string]: TableData
}

export interface ContextProps {
  state: Table;
  dispatch: Dispatch<Actions>;
}

export const initialState: Table = {
  'Valid Dictionary sample': {
    errors: null,
    columns: [{ title: 'Domain', field: 'Domain' }, { title: 'Range', field: 'Range' }],
    data: [{ Domain: 'Stonegrey', Range: 'Dark Grey'},
           { Domain: 'Midnight Black', Range: 'Black'},
           { Domain: 'Mystic Silver', Range: 'Silver'}
    ]
  },
  'Duplicated Dictionary sample': {
    errors: null,
    columns: [{ title: 'Domain', field: 'Domain' }, { title: 'Range', field: 'Range' }],
    data: [{ Domain: 'Stonegrey', Range: 'Dark Grey'},
           { Domain: 'Stonegrey', Range: 'Dark Grey'},
           { Domain: 'Caribbean Sea', Range: 'Turquoise'}
    ]
  },
  'Forked Dictionary sample': {
    errors: null,
    columns: [{ title: 'Domain', field: 'Domain' }, { title: 'Range', field: 'Range' }],
    data: [{ Domain: 'Stonegrey', Range: 'Dark Grey'},
           { Domain: 'Stonegrey', Range: 'Anthracite'},
           { Domain: 'Midnight Blue', Range: 'Dark Blue'}
    ]
  },
  'Cycles Dictionary sample': {
    errors: null,
    columns: [{ title: 'Domain', field: 'Domain' }, { title: 'Range', field: 'Range' }],
    data: [{ Domain: 'Stonegrey', Range: 'Dark Grey'},
           { Domain: 'Dark Grey', Range: 'Stonegrey'},
           { Domain: 'Midnight Blue', Range: 'Dark Blue'}
    ]
  },
  'Chain Dictionary sample': {
    errors: null,
    columns: [{ title: 'Domain', field: 'Domain' }, { title: 'Range', field: 'Range' }],
    data: [{ Domain: 'Stonegrey', Range: 'Dark Grey'},
           { Domain: 'Dark Grey', Range: 'Anthracite'},
           { Domain: 'Midnight Blue', Range: 'Dark Blue'}
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