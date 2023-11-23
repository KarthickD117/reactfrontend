import * as React from 'react';
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { axiosEvent } from "../utils/axiosEvent";
import StickyTable from '../components/table';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

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
  const [resultArray, setResultArray] = useState([]);
  const [selectedDeviceType, setSelectedDeviceType] = useState('');
  const [selectedDeviceBrand, setSelectedDeviceBrand] = useState('');
  const [perm, setPerm] = useState(false)
  const handleChange = (e) => {
    setSelectedDeviceType(e.target.value)
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
        setPerm(response.data.perm)
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => { 
    fetchData();
  }, []);

  const setOfDeviceType = Array.from(new Set(resultArray.map((data) => data.assetType)))
  const filteredRows = selectedDeviceType !== 'All'
    ? resultArray.filter((rows) => rows.assetType === selectedDeviceType)
    : resultArray;

  const setOfDeviceBrand = Array.from(new Set(filteredRows.map((data) => data.assetBrand)))
  const secondFilter = selectedDeviceBrand !== 'All'
  ? filteredRows.filter((rows) => rows.assetBrand === selectedDeviceBrand)
  : filteredRows;

  return (
    <>
    <div class="button" style={{ paddingLeft: 25 }}>
        {perm && <Button variant="outline-primary" onClick={navigatee} disabled={!perm}>
          Add Device
        </Button>}
      </div>
      <Container>
        <Row>
          <Col lg="3">
            <Form.Select size="sm" onChange={handleChange}>
              <option value=''>Device Type</option>
              <option value='All'>All</option>
              {setOfDeviceType.map((deviceType) => <option value={deviceType}> {deviceType} </option>)}
            </Form.Select>
          </Col>
          <Col lg="3">
          <Form.Select size="sm" onChange={handleBrandChange} >
            <option value=''>Device Brand</option>
              <option value='All'>All</option>
              {setOfDeviceBrand.map((deviceBrand) => <option value={deviceBrand}> {deviceBrand} </option>)}
            </Form.Select>
          </Col>
        </Row>
      </Container>
      <div className="table" style={{padding:30}}>
    <StickyTable columns={columns} data={secondFilter}/>
    </div>
    </>
  );
}