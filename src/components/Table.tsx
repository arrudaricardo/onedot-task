import React, { useState, useContext, useEffect, forwardRef, createRef } from 'react'
import MaterialTable, { Column } from 'material-table';
import { Context, ContextProps } from './Store'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface Row {
  name: string;
  surname: string;
  birthYear: number;
  birthCity: number;
}

export default function Table() {
  const classes = useStyles();
  const { state, dispatch } = useContext<ContextProps>(Context);
  const [table, setTable] = useState(Object.keys(state)[0]);

  let tableRef: React.RefObject<any> = createRef()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTable(event.target.value as string);
  };

  let data = state[table].data
  let columns = state[table].columns

  useEffect(() => {
   data = state[table].data
   columns = state[table].columns
   console.log(data)
   tableRef.current && tableRef.current.onQueryChange()

  },[state, table])

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="dictionary">Dictionaries</InputLabel>
        <Select
          labelId="Dictionary"
          id="dic-select"
          value={table}
          onChange={handleChange}
        >
          {Object.keys(state).map(name =>
            <MenuItem key={name} value={name}>{name}</MenuItem>
          )}

        </Select>
      </FormControl>

      <MaterialTable
        tableRef={tableRef}
        title={table}
        columns={columns}
        data={query => 
          new Promise((resolve, rejects) => {
            resolve({data, page: 0, totalCount: 0})
          })
        }

        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                dispatch({type:'ADDROW',value: {table, newData}})
                resolve();
              }, 600);
            })
          }}
        />
    </div>
    );
  }
  
