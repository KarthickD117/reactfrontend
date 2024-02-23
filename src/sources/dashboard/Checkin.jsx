import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from '@mui/material/Grid'
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import Paper from "@mui/material/Paper";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "../css/checkin.css";
import { useEffect, useState, useContext } from "react";
import Button from '@mui/material/Button';
import { axiosEvent } from "../utils/axiosEvent";
import { devdb } from "../../context";
import {Models} from "../components/confirmModel";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function CheckIn() {
  const val = useContext(devdb)
  const [open, setOpen] = React.useState(false);
  const handleOpen = (psNo, assetNO, assetModel) => {
    setOpen(true)
    setShow({ps_no:psNo,assetNo:assetNO})
    setAssetModelNo({assetModel:assetModel})
  }
  const handleClose = () => setOpen(false);
  const updateData = () => {
    fetchData()
    setDevicedata()
  }
  const [show, setShow] = useState({ps_no:'',assetNo:''}) // setassetnumber
  const [assetModelNo, setAssetModelNo] =useState({assetModel:''})
  const [resultArray, setResultArray] = useState([]);

  const fetchData = async () => {
    await axiosEvent.get("devicereport/checkin/")
      .then((response) => setResultArray(response.data))
      .catch((err) => console.log(err));
  }

  const setDevicedata = () => {
    axiosEvent.get("devices/")
      .then((response) => {
        val.assetdb = (response.data.data);
        val.hasPerm = response.data.perm
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEvent = () => {
    updateData()
    handleClose()
}

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosEvent.post('devicereport/returndevice/',
        show
      ).then(response => {
        console.log('response is ', response)
      });
    } catch (error) {
      console.log(error);
    }
    handleEvent()
  };
  return (
      <div className="mainn" style={{ backgroundColor:'#e0e0e0', overflowY:"auto", width:'96%'}}>
     <TableContainer component={Paper} sx={{width:'97%',marginLeft:'1.5%',marginTop:'1.5%'}}>
        <Table
          aria-label="simple table"
          style={{ backgroundColor: "white"}}
        >
          <TableHead>
            <TableRow>
              <TableCell>Asset No</TableCell>
              <TableCell>Asset Type</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Device Name</TableCell>
              <TableCell>Date Borrowed</TableCell>
              <TableCell>Borrower Name</TableCell>
              <TableCell>Action</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {resultArray.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.assetNo.assetNo}
                </TableCell>
                <TableCell>{row.assetNo.assetType}</TableCell>
                <TableCell>{row.assetNo.assetSerialNumber}</TableCell>
                <TableCell>{row.assetNo.assetBrand}</TableCell>
                <TableCell>{row.dateBorrowed}</TableCell>
                <TableCell>{row.ps_no.Firstname}</TableCell>
                <TableCell><Button style={{backgroundColor: "Orange"}} variant='contained' startIcon={<CloseOutlinedIcon />}
                  onClick={() => handleOpen(row.ps_no.ps_no,row.assetNo.assetNo, row.assetNo.assetModel)}>RETURN</Button>
                  </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <div className="text-center m-4">
          <p>{ resultArray.length === 0 ?
             'No Device Allocated'
              : <div></div>}</p>
        </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Return Device"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do you want to return the device {assetModelNo.assetModel}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Return</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
