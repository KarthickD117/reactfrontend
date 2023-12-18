import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { setSessionStorage } from '../utils/sessionStorage';
import { removecookie } from '../utils/cookieSet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:170,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  justifyContent:"center",
  p: 4,
};

export default function Logout({openModel, handleCloseEvent}) {

    const navigate = useNavigate()
    const handleSubmit = async (event) => {
      sessionStorage.clear()
      removecookie()
      navigate('/login')
    };

    return (
        <div>
          <Dialog
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "300px",
              },
            },
          }}
        open={openModel}
        onClose={handleCloseEvent}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"LOGOUT"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to logout ?       
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Logout</Button>
          <Button onClick={handleCloseEvent} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}
