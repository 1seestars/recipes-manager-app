import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      position: 'absolute',
      width: '40%',
      minHeight: '60%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '1%',
      outline: 'none',
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
        <div><TextField id="outlined-basic" label="Outlined" variant="outlined" /></div>
        <div><textarea style={{ width: '20%', height: '200px', resize: 'none' }}></textarea></div>
        </div>
      </Modal>
    </div>
  );
}