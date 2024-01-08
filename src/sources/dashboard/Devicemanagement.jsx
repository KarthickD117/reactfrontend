import * as React from 'react';
import Form from "react-bootstrap/Form";
import { useEffect, useState, useContext } from "react";
import { axiosEvent } from "../utils/axiosEvent";
import StickyTable from '../components/table';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { devdb } from '../../context';
import { useSearchCtx } from '../utils/customcontext';
import { Grid } from '@mui/material';
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
  console.log(filters())
  return (
    <div className='devicetable'  style={{height: '87%', overflow:"auto"}}>
    <div className="button" style={{ paddingLeft: '2.5%' }}>
        {perm && <Button variant="primary" onClick={navigatee} disabled={!perm}>
          Add Device
        </Button>}
      </div>
      <Grid container sx={{paddingLeft:'2.5%', paddingTop:'2%'}} columnGap={2}>
        <Grid item xs={2}>
        <Form.Select size="sm" onChange={handleChange}>
              <option value=''>Device Type</option>
              
              {setOfDeviceType.map((deviceType, index) => <option key={index} value={deviceType}> {deviceType} </option>)}
            </Form.Select>
        </Grid>
        <Grid item xs={2}>
        <Form.Select key={selectedDeviceType} size="sm" onChange={handleBrandChange} >
            <option value=''>Device Brand</option>
              
              {setOfDeviceBrand.map((deviceBrand, index) => 
                <option key={index} value={deviceBrand}> {deviceBrand} </option>)
              }
            </Form.Select>
        </Grid>
      </Grid>
      <div className="table" style={{paddingTop:'2%'}}>
    <StickyTable columns={columns} data={filters()}/>
    </div>
    </div>
  );
}