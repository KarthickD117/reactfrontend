import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { setSessionStorage } from '../utils/sessionStorage';
import { removecookie } from '../utils/cookieSet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Logout({openModel, handleCloseEvent}) {
    const [logoutMessage, setLogoutMessage] = React.useState("");
    const [messageColor, setMessageColor] = React.useState("");
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
      sessionStorage.clear()
      removecookie()
      navigate('/login')
    };

    return (
        <div>
        <Modal
        open={openModel}
        onClose={handleCloseEvent}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
        <Box sx={{ ...style }}>
            <Logout />
        
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Do you want to logout?
                </Typography>
                <Button sx={{top:20}}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  LOGOUT
                </Button>
                <div style={{ color: messageColor }}>{logoutMessage}</div>
            </Box>
            <Button sx={{top:35,left:'225px', width:'100px'}}
            variant="contained"
            onClick={handleCloseEvent}
        >
            CLOSE</Button>
        </Box>
        </Modal> 
        </div>
    );
}
