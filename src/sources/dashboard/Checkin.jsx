import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../css/checkin.css";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { axiosEvent } from "../utils/axiosEvent";
import {Models} from "../components/confirmModel";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function CheckIn() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = (psNo, assetNO) => {
    setOpen(true)
    setShow({ps_no:psNo,assetNo:assetNO})
  }
  const handleClose = () => setOpen(false);
  const updateData = () => fetchData()
  const [show, setShow] = useState({ps_no:'',assetNo:''}) // setassetnumber
  const [resultArray, setResultArray] = useState([]);
  const fetchData = async () => {
    await axiosEvent.get("devicereport/checkin/")
      .then((response) => setResultArray(response.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
      <div className="main">
          <div className="alert">
              <h6>{ resultArray.length === 0 ? 'No Device Allocated': 'Allocated Devices'}</h6>
          </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
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
                  onClick={() => handleOpen(row.ps_no.ps_no,row.assetNo.assetNo)}>RETURN</Button>
                  </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Models open={open} show={show} handleClose={handleClose} events={'return'} updateData={updateData}/>
    </div>
  );
}
