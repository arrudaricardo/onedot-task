import React,{useContext} from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Context, ContextProps} from './Store'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
    backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
      modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
        margin: theme.spacing(1),
        width: 200,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    buttons: {
      paddingTop: '2em',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
    
  }),
);

type ModalProp = {
  setTable: React.Dispatch<React.SetStateAction<string>>
}

export default function SimpleModal({setTable}: ModalProp) {
  const { state, dispatch } = useContext<ContextProps>(Context);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('')


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <div className={classes.button}>
        <Tooltip title="Create Dictionary">
        <Fab onClick={handleOpen} size='small'color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        </Tooltip>
      </div>

      <Modal
      className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
            
          <form className={classes.form} noValidate autoComplete="off">
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </form>
          
          <div className={classes.buttons}>
          <Button size='small' variant="contained" color="primary" onClick={() => {

            const hasName = Object.keys(state).some( el => name === el )
            if (!hasName) {
              dispatch({type:'CREATE', value: name})
              setTable(name)
              setOpen(false)
            }else {
              // TODO: Display Error
            }

          }}>
            Create
          </Button>

          <Button size='small' onClick={handleClose}variant="contained" color="secondary">
            Cancel 
            
          </Button>
        </div>

        </div>
      </Modal>
    </div>
  );
}