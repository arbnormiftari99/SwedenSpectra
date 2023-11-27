import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


const ToastContext = React.createContext({
  show: () => {},
});

const ToastProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('');
  const [duration, setDuration] = React.useState(2000);
  const [anchorOrigin,setAnchorOrigin] = React.useState({ vertical: 'bottom', horizontal: 'center' });

  const showToast = (message, severity, duration,anchorOrigin) => {
    setMessage(message);
    setSeverity(severity);
    duration&&setDuration(duration);
    setOpen(true);
    anchorOrigin && setAnchorOrigin(anchorOrigin);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        <MuiAlert onClick={handleClose} severity={severity} sx={{ width: '100%' }}>
       {message}
     </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const { showToast } = React.useContext(ToastContext);
  return showToast;
};

export { ToastProvider, useToast };
