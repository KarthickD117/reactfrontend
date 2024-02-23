import * as React from 'react';
import Form from "react-bootstrap/Form";
import { useEffect, useState, useContext } from "react";
import { axiosEvent } from "../utils/axiosEvent";
import StickyTable from '../components/table';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { devdb } from '../../context';
import { useSearchCtx } from '../utils/customcontext';
import { Grid } from '@mui/material';
import '../css/devicemanagement.css'
const columns = [
  { id: 'assetNo', label: "Device ID", minWidth: 50 },
  { id: 'assetType', label: "Device Type", minWidth: 50 },
  { id: 'assetBrand', label: "Device Brand", minWidth: 50 },
  { id: 'assetModel', label: "Device Model", minWidth: 50 },
  { id: 'assetOsVersion', label: "OS Version", minWidth: 50 },
  { id: 'assetSerialNumber', label: "Device Serial Number", minWidth: 50 },
  { id: 'assetOwnership', label: "Ownership", minWidth: 80 },
  { id: 'assetLocation', label: "Location", minWidth: 50 },
  { id: 'assetAvailability', label: "Device Availability", minWidth: 50 },
];

export default function DataTable() {
  const val = useContext(devdb)
  const [category, setCategory] = useState()
  const [totalDevice, setTotalDevice] = useState()
  const [deviceInUse, setDeviceInUse] = useState()
  const [available, setAvailableDevice] = useState()
  const [resultArray, setResultArray] = useState([]);
  const [selectedDeviceType, setSelectedDeviceType] = useState('');
  const [selectedDeviceBrand, setSelectedDeviceBrand] = useState('');
  const [perm, setPerm] = useState(val.hasPerm)
  const [searchData, setSearchData] = useSearchCtx()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChange = (e) => {
    setPage(0)
    setSelectedDeviceType(e.target.value)
    setSelectedDeviceBrand("")
  };
  const handleBrandChange = (e) => {
    setSelectedDeviceBrand(e.target.value)
  };
  const navigate = useNavigate();
  const navigatee = () => {
    navigate("/adddevice");
  };
  const fetchData = async () => {
    await axiosEvent
      .get("devices/")
      .then((response) => {
        setResultArray(response.data.data)
        val.assetdb = (response.data.data);
        val.hasPerm = response.data.perm
        setPerm (val.hasPerm)
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => { 
    if (val.assetdb===''){ 
    fetchData();
    } else {
      setResultArray(val.assetdb)
    }
  }, []);

  useEffect(() =>{
    let Availability = resultArray.filter(row => row.assetAvailability === 'Available').length
    setTotalDevice(resultArray.length)
    setCategory(Array.from(new Set(resultArray.map((data) => data.assetType))).length)
    setAvailableDevice(Availability)
  },[resultArray])

  function firstfilter(){
    if (selectedDeviceType === ''){
      return resultArray;
    }
    if (selectedDeviceType !== ''){
      return resultArray.filter((rows) => rows.assetType === selectedDeviceType)
    }
    
  }
  function secondfilter(){
    if (selectedDeviceBrand === ''){
      return filteredRows;
    }
    if (selectedDeviceBrand !== '' ){
      return filteredRows.filter((rows) => rows.assetBrand === selectedDeviceBrand)
    }
  }

  const setOfDeviceType = Array.from(new Set(resultArray.map((data) => data.assetType)))
  const filteredRows = selectedDeviceType === '' ? resultArray : resultArray.filter((rows) => rows.assetType === selectedDeviceType)

  const setOfDeviceBrand = Array.from(new Set(filteredRows.map((data) => data.assetBrand)))
  const secondFilter = Array.from(selectedDeviceBrand === '' ? filteredRows : filteredRows.filter((rows) => rows.assetBrand === selectedDeviceBrand))

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

  return (
    <>
    <div className='devicetable'  style={{height: '87%', overflow:"auto", backgroundColor:'#f5f5f5'}}>
    <div className='overall-container'>
      <h5 className='container-header'>
        Overall Devices
      </h5>
      <Grid container className='count-container'>
        <Grid item xs={3} className='category'>
          <h6 style={{color:"red"}}>Categories</h6>
          <div>{category}</div>
        </Grid>
        <Grid item xs={3}>
          <h6 style={{color:'orange'}}>Total Devices</h6>
          <div>{resultArray.length}</div>
        </Grid>
        <Grid item xs={3}>
          <h6 style={{color:'purple'}}>Device In Use</h6>
          <div>{totalDevice - available}</div>
        </Grid>
        <Grid item xs={3}> 
          <h6 style={{color:'red'}}>Available Devices</h6>
          <div>{available}</div>
        </Grid>
      </Grid>
    </div>
    <div className='total-table'>
      <Grid container className='filter-container' >
        <Grid item xs={2}>
        <Form.Select size="sm" onChange={handleChange}>
              <option value=''>Device Type</option>
              {setOfDeviceType.map((deviceType, index) => <option key={index} value={deviceType}> {deviceType} </option>)}
            </Form.Select>
        </Grid>
        <Grid item xs={2} style={{paddingLeft:'1%'}}>
        <Form.Select key={selectedDeviceType} size="sm" onChange={handleBrandChange} >
            <option value=''>Device Brand</option>
              
              {setOfDeviceBrand.map((deviceBrand, index) => 
                <option key={index} value={deviceBrand}> {deviceBrand} </option>)
              }
            </Form.Select>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={2}>
       <div style={{textAlign:'end'}}>
        {perm && <Button variant="contained" sx={{backgroundColor:'blue', '&:hover':{backgroundColor:'#005580'}}} onClick={navigatee} disabled={!perm}>
          Add Device
        </Button>}
        </div>

        </Grid>
      </Grid>
      <div className="device-table">
    <StickyTable columns={columns} data={filters()}/>
    </div>
    </div>
    </div>
    </>
  );
}