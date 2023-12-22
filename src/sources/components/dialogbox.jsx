import React, { useEffect, useState, useContext } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Form from "react-bootstrap/Form";
import { empdb, perm } from "../../context";
import Button from '@mui/material/Button';
import { axiosEvent } from "../utils/axiosEvent";
import '../css/dialogbox.css'
import { getSessionStorage } from "../utils/sessionStorage";

export default function Dialogbox ({open, handleClose, show, updateData}) {
    const val = useContext(empdb)
    const userDetail = useContext(perm)
    const [resultArray, setResultArray] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ps_no:0, assetNo:Number(show.assetNo)});

    const handleChange = (e) => {
        setSelectedUser({ps_no:Number(e.target.value), assetNo:Number(show.assetNo)})
      };
    
      const handleEvent = () => {
        updateData()
        handleClose()
    }

    const fetchData = async () => {
        await axiosEvent.get("employees/")
          .then((response) => {
            setResultArray(response.data.data)
            val.userdb = response.data.data
            val.hasPerm = response.data.perm
          })
          .catch((err) => console.log(err));
      };
    
      useEffect(() => {
        if (val.userdb==='') { 
          fetchData();
          } 
        else {
          setResultArray(val.userdb)
        }
        if (getSessionStorage('isAdmin') === 'false' ) {
          setSelectedUser({ps_no:Number(getSessionStorage('username')), assetNo:Number(show.assetNo)})
        }
      }, []);

      const handleSubmit = async (e) => {
        console.log(show.assetNo, selectedUser.ps_no)
        e.preventDefault();
        try {
          const response = await axiosEvent.post('devicereport/borrowdevice/',
            selectedUser
          ).then(response => {
            console.log('response is ', response)
          });
        } catch (error) {
          console.log(error);
        }
        handleEvent()
      }
      
    return (
        <Dialog
        fullWidth='400px'
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Device Request"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div className="container-grid">
              <div className="row1">
              Request {show.assetModel} to &nbsp;
              </div>
              <div className="row2">
              {getSessionStorage('isAdmin') === 'true' ? <Form.Select size='xs' onChange={handleChange}>
                        <option value=''> Select Employee </option>
                        {resultArray.map((empName) => <option value={empName.ps_no}>{empName.ps_no} - {empName.Firstname}</option>)}
                    </Form.Select> : getSessionStorage('username')}
              </div>
          </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={selectedUser.ps_no == ''} onClick={handleSubmit}>Request</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}