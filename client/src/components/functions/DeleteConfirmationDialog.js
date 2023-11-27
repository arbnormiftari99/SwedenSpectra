import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useStyles from '../Posts/Post/styles.js';


const DeleteConfirmationDialog = ({ open, handleDeleteClose, handleDeleteConfirm }) => (

  <Dialog

    open={open}
    onClose={handleDeleteClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        This action cannot be undone. Do you want to proceed with the deletion?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button  onClick={handleDeleteClose} color="primary">No</Button>
      <Button onClick={handleDeleteConfirm} autoFocus color="error">
        Yes, Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirmationDialog;

