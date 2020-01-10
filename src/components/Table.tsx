import React, { useState, useContext, useEffect, forwardRef} from 'react'
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

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default function Table() {
  const classes = useStyles();
  const { state, dispatch } = useContext<ContextProps>(Context);
  const [table, setTable] = useState(Object.keys(state)[0]);


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTable(event.target.value as string);
  };

  const tableKeys = Object.keys(state[table].values)



   const keyValue = tableKeys.map( k => state[table].values[k].map(e => ({[k]: e}) ))


   const getTableData = ():any => {
     let res:any = []
     keyValue.forEach(arr =>{
       arr.forEach( (el, idx) => {
         res[idx] = {...res[idx], ...el}
       })
     } )
     return res
   }

   let tableData = getTableData()

   useEffect(()=> {
     tableData = getTableData();

   },[table])

   console.log(keyValue)
   console.log(tableData)
   

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
          title={table}
          columns={ tableKeys.map( k => ({title: k, field: k}))  }
          data={tableData}
        />
    </div>
  );
}

