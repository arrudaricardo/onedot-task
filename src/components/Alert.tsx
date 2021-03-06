import React,{useEffect} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

type AlertProp = {
  message: string
}

export default function ActionAlerts({message}: AlertProp) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  useEffect(()=> {
    if (message.length > 0 ){
      setOpen(true)
    }else {
      setOpen(false)
    }

  },[message])

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
        severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
       <AlertTitle>Warning</AlertTitle>
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}