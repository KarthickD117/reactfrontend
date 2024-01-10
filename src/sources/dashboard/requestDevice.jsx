import React from "react";
import Form from "react-bootstrap/Form";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState, useContext } from "react";
import { axiosEvent } from "../utils/axiosEvent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { devdb, empdb } from "../../context";
import '../css/dialogbox.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getSessionStorage } from "../utils/sessionStorage";
import { useSearchCtx } from "../utils/customcontext";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Grid } from "@mui/material";

export default function RequestDevice() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const val = useContext(devdb)
  const empVal = useContext(empdb)

  const [open, setOpen] = React.useState(false);
  const [resultArray, setResultArray] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ps_no:'', assetNo:''});
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedDeviceBrand, setSelectedDeviceBrand] = useState("");
  const [searchData, setSearchData] = useSearchCtx('')
  const [errMsg, setErrMsg] = useState('')
  const [show, setShow] = useState({ps_no:'', assetNo:'', assetModel:''}) // setassetnumber
  
  const handleClickOpen = (e, data) => {
    setOpen(true);
    if (getSessionStorage('isAdmin') === 'false')
      {setSelectedUser({ps_no:getSessionStorage('username'), assetNo:e})}
    setShow({assetNo:e, assetModel:data})
  };

  const handleClose = () => {
    setSelectedUser({ps_no:'', assetNo:''})
    if(errMsg !== ''){
      fetchData()
    }
    setErrMsg('')
    setOpen(false);
  };
 
  const updateData = () => {
    fetchData()
  }
 
  const handleChange = (e) => {
    setSelectedDeviceType(e.target.value)
    setSelectedDeviceBrand("")
  };
  const handleBrandChange = (e) => {
    setSelectedDeviceBrand(e.target.value)
  };

  const fetchData = async () => {
    await axiosEvent.get("devices/")
      .then((response) => {
        setResultArray(response.data.data)
        val.assetdb = (response.data.data);
        val.hasPerm = response.data.perm
      })
      .catch((err) => console.log(err));
  };
  
  const fetchEmpData = async () => {
    await axiosEvent.get("employees/")
      .then((response) => {
        setEmpDetails(response.data.data)
        empVal.userdb = response.data.data
        empVal.hasPerm = response.data.perm
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    if (empVal.userdb==='') { 
      fetchEmpData();
    } 
    else {
      setEmpDetails(empVal.userdb)
    }
  }, []);

  const handleEmpChange = (e, value) => {
    if(value !== null){
      setSelectedUser({ps_no:Number(value.ps_no), assetNo:Number(show.assetNo)})
    }
    else{
      setSelectedUser({ps_no:'', assetNo:Number(show.assetNo)})
    }
    //setSelectedUser({ps_no:Number(value.ps_no), assetNo:Number(show.assetNo)})
  };

  const handleEvent = () => {
    updateData()
    handleClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
          const response = await axiosEvent.post('devicereport/borrowdevice/',
            selectedUser
          ).then(response => {
            console.log(response.data)
            handleEvent()
          });
        } catch (error) {
          setErrMsg('*The device is not available at the moment please try again later')
        }
  }

  const setOfDeviceType = Array.from(new Set(resultArray.map((data) => data.assetType)))
  
  const filteredRows = selectedDeviceType !== ''
    ? resultArray.filter((rows) => rows.assetType === selectedDeviceType)
    : resultArray;

  const setOfDeviceBrand = Array.from(new Set(filteredRows.map((data) => data.assetBrand)))
  
  const secondFilter = selectedDeviceBrand !== ''
  ? filteredRows.filter((rows) => rows.assetBrand === selectedDeviceBrand)
  : filteredRows;

  function filters() {
    if(searchData === ''){
      return secondFilter
    }
    else{
      const fd = secondFilter.filter(rows => 
        rows.assetType.toLowerCase().includes(searchData.toLowerCase()) ||
        rows.assetBrand.toLowerCase().includes(searchData.toLowerCase()) ||
        String(rows.assetNo).includes(searchData) ||
        (rows.assetOsVersion !==null ? rows.assetOsVersion.toLowerCase().includes(searchData.toLowerCase()) : '') ||
        rows.assetAvailability.toLowerCase().includes(searchData.toLowerCase()) ||
        (rows.assetSerialNumber !== null ? rows.assetSerialNumber.toLowerCase().includes(searchData.toLowerCase()) : '') ||
        (rows.assetModel !== null ? rows.assetModel.toLowerCase().includes(searchData.toLowerCase()) : ''))
      return fd
    }
  }
  const filterOptions = createFilterOptions({
    matchFrom: 'end',
    stringify: (option) => option.ps_no+' - '+option.Firstname,
  });
  console.log(filters() == null)
  return (
    <div className="mainn" style={{ backgroundColor:colors.grey[900], overflowY:"auto", width:'97%'}}>
      <Grid container sx={{paddingLeft:'1.5%', paddingTop:'2%' }} columnGap={2}>
        <Grid item xs={3}>
          <Form.Select size="sm" onChange={handleChange}>
              <option value=''>Device Type</option>            
              {setOfDeviceType.map((deviceType) => <option value={deviceType}> {deviceType} </option>)}
          </Form.Select>
        </Grid>
        <Grid item xs={3}>
          <Form.Select size="sm" key={selectedDeviceType} onChange={handleBrandChange}>
            <option value=''>Device Type</option> 
            {setOfDeviceBrand.map((deviceBrand) => <option value={deviceBrand}> {deviceBrand} </option>)}
            </Form.Select>
        </Grid>
      </Grid>
      <br />
     <TableContainer component={Paper} sx={{width:'97%',marginLeft:'1.5%'}}>
        <Table
          sx={{ bgcolor: 'background.paper'}}
          aria-label="simple table"  
        >
          <TableHead>
            <TableRow sx={{position:'sticky'}}>
              <TableCell>Asset No</TableCell>
              <TableCell>Asset Type</TableCell>
              <TableCell>Asset Brand</TableCell>
              <TableCell>Asset Model</TableCell>
              <TableCell>OS Version</TableCell>
              <TableCell>Auto Update</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filters().map((row) => (
              <TableRow
                key={row.assetNo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.assetNo}
                </TableCell>
                <TableCell>{row.assetType}</TableCell>
                <TableCell>{row.assetBrand}</TableCell>
                <TableCell>{row.assetModel}</TableCell>
                <TableCell>{row.assetOsVersion}</TableCell>
                <TableCell>{row.assetUpdate}</TableCell>
                <TableCell> 
                <Button style={{backgroundColor:colors.redAccent[500]}} startIcon={<ShoppingCartIcon/>} variant='contained' disabled={row.assetAvailability !== 'Available'} onClick={()=> handleClickOpen(row.assetNo, row.assetModel)}>REQUEST</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="request-dialog-title"
        aria-describedby="request-dialog-description"
      >
        <DialogTitle id="request-dialog-title">
          {"Device Request"}
        </DialogTitle>
        <DialogContent>
          
          <div className="container-grid">
            <div className="row1">
              Request {show.assetModel} to &nbsp;
            </div>
            <div className="row2">
              {getSessionStorage('isAdmin') === 'true' ? 
                <Autocomplete
                  id="filter-demo"
                  onChange={handleEmpChange}
                  options={empDetails}
                  getOptionLabel={(option) => option.ps_no+' - '+option.Firstname}
                  filterOptions={filterOptions}
                  isOptionEqualToValue={(option,value) => option.value === value.value}
                  sx={{ width: 200 }}
                  size="small"
                  renderInput={(params) => 
                  <TextField {...params} 
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                    '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }
                    }}
                  label="Select User"
                   />
            }
              />
                : getSessionStorage('username')}
              </div>
          </div>
          {errMsg !==''?<div style={{color:'red'}}>
            {errMsg}
          </div>:''}  
        </DialogContent>
        <DialogActions>
          <Button disabled={selectedUser.ps_no === ''} onClick={handleSubmit}>Request</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
