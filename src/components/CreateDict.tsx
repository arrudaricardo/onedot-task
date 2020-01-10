import React,{useContext} from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Context, ContextProps} from './Store'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
    backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
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
    }
  }),
);

export default function SimpleModal() {
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
      <button type="button" onClick={handleOpen}>
        Create Dictionary
      </button>
      <Modal
      className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
            
          <form className={classes.form} noValidate autoComplete="off">
            <TextField label="Standard" value={name} onChange={(e) => setName(e.target.value)} />
          </form>
          <Button variant="contained" color="primary" onClick={() => {

            const hasName = Object.keys(state).some( el => name === el )
            if (!hasName) {
              dispatch({type:'CREATE', value: name})
            }else {
              // TODO: Display Error
            }

          }}>
            Create
          </Button>
          <Button onClick={handleClose}variant="contained" color="secondary">
            Cancel 
          </Button>

          <SimpleModal />
        </div>
      </Modal>
    </div>
  );
}