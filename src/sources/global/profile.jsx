import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import { Box, IconButton } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import Modal from '@mui/material/Modal';
import Logout from './logout';

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
    //handleOpen();
  };
  const [openModel, setOpenModel] = React.useState(false);
  const handleOpen = () => {
    setOpenModel(true);
  };
  const handleCloseEvent = () => {
    setOpenModel(false);
  };


  return (
    
    <div>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <PersonOutlinedIcon />
        </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick= {handleOpen}>Logout</MenuItem>
        <Logout openModel={openModel} handleCloseEvent={handleCloseEvent}/>
      </Menu>
    </div>
  );
}