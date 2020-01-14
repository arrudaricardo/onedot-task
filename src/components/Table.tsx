import React, { useState, useContext, useEffect, forwardRef, createRef } from 'react'
import MaterialTable, { Column } from 'material-table';
import { Context, ContextProps } from './Store'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CreateDictModal from './CreateDictModal'
import {checkAllValidation} from '../util/validation_helper'
import Alert from './Alert'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    inputSection: {
      display: 'flex',
      flexDirection: 'row'
    }
  }),
);


export default function Table() {
  const classes = useStyles();
  const { state, dispatch } = useContext<ContextProps>(Context);
  const [table, setTable] = useState(Object.keys(state)[0]);
  const [invalidIndexs, setInvalidIndexs] = useState<number[] | []>([])
  const [error, setError] = useState<string>('')

  let tableRef: React.RefObject<any> = createRef()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTable(event.target.value as string);
  };

  let data = state[table].data
  let columns = state[table].columns

  useEffect(() => {
    data = state[table].data
    columns = state[table].columns

    let validation = checkAllValidation(state[table])
    setError(validation.error);
    setInvalidIndexs(validation.indexes)

    //refresh table component
    tableRef.current && tableRef.current.onQueryChange()

  }, [state, table])


  return (
    <div>
      <div className={classes.inputSection}>
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
        <CreateDictModal setTable={setTable} />
        <Alert message={error}/>
      </div>

      <MaterialTable
        tableRef={tableRef}
        title={table}
        columns={columns}
        data={query =>
          new Promise((resolve, rejects) => {
            resolve({ data, page: 0, totalCount: 0 })
          })
        }

        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                dispatch({ type: 'ADDROW', value: { table, newData } })
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {

                let data = state[table].data
                const index = data.indexOf(oldData!);


                type TUpdate = {
                  table: string;
                  newData: any;
                  index: number
                }
                let value: TUpdate = {
                  table, newData, index
                }

                dispatch({ type: 'UPDATEROW', value })

                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                let data = state[table].data;
                const index = data.indexOf(oldData);
                let value = {
                  table,
                  index
                }

                dispatch({ type: 'DELETEROW', value })

                resolve();
              }, 1000);
            })
        }}
        options={{
       showTitle: false,
       search: false,
       paging: false,
          rowStyle: rowData => ({
            backgroundColor: (invalidIndexs.some(e => e === rowData.tableData.id)) ? '#e8051f' : '#FFF'
})
        }}
      />
    </div>
  );
}

