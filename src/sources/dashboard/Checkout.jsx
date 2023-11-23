import React from "react";
import Form from "react-bootstrap/Form";
import "../css/allocate.css";
import { useLocation, useNavigate } from "react-router-dom";
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
import {Models} from "../components/confirmModel";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext,tokens } from "../../theme";

export default function Checkout() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {setOpen(true);
    setShow({ps_no:empData.ps_no, assetNo:e})
  }
  const updateData = () => fetchData()
  const handleClose = () => {setOpen(false)};
  const emp = useLocation();
  const empData = Object.fromEntries(emp.state)
  const [resultArray, setResultArray] = useState([]);
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedDeviceBrand, setSelectedDeviceBrand] = useState("");
  const [show, setShow] = useState({ps_no:'', assetNo:''}) // setassetnumber
  const handleChange = (e) => {
    setSelectedDeviceType(e.target.value)
  };
  const handleBrandChange = (e) => {
    setSelectedDeviceBrand(e.target.value)
  };

  const fetchData = async () => {
    await axiosEvent.get("devices/")
      .then((response) => setResultArray(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData()
  }, []);

  const setOfDeviceType = Array.from(new Set(resultArray.map((data) => data.assetType)))
  const filteredRows = selectedDeviceType !== 'All'
    ? resultArray.filter((rows) => rows.assetType === selectedDeviceType)
    : resultArray;

  const setOfDeviceBrand = Array.from(new Set(filteredRows.map((data) => data.assetBrand)))
  const secondFilter = selectedDeviceBrand !== 'All'
  ? filteredRows.filter((rows) => rows.assetBrand === selectedDeviceBrand)
  : filteredRows;

  const navigate = useNavigate();
  const goback = () => {
    navigate("/allocate");
  };
  return (
    <div className="mainn">
      <Container>
        <Row className="row">
          <Col sm={10}>
            <h4>Name: {empData.Firstname}</h4>
          </Col>
          <Col sm={2}>
            {" "}
            <Button variant="secondary" onClick={goback}>
              Go Back
            </Button>
          </Col>
        </Row>
      </Container>
      <div className="linehandle">
        <div class="line"></div>
      </div>
      <Container>
        <Row>
          <Col lg='3'>
            <Form.Select size="sm" onChange={handleChange}>
              <option>Device Type</option>
              <option value='All'>All</option>
              {setOfDeviceType.map((deviceType) => <option value={deviceType}> {deviceType} </option>)}
            </Form.Select>
          </Col>
          <Col lg='3'>
            <Form.Select size="sm" onChange={handleBrandChange}>
            <option>Device Type</option>
              <option value='All'>All</option>
              {setOfDeviceBrand.map((deviceBrand) => <option value={deviceBrand}> {deviceBrand} </option>)}
            </Form.Select>
          </Col>
        </Row>
      </Container>
      <br />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, bgcolor: 'background.paper'}}
          aria-label="simple table"
          style={{ backgroundColor:colors.grey[900]}}
        >
          <TableHead>
            <TableRow >
              <TableCell width={'50'} align="center">Asset No</TableCell>
              <TableCell>Asset Type</TableCell>
              <TableCell>Asset Brand</TableCell>
              <TableCell>Asset Model</TableCell>
              <TableCell>OS Version</TableCell>
              <TableCell>Asset SerialNo</TableCell>
              <TableCell>Auto Update</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {secondFilter.map((row) => (
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
                <TableCell>{row.assetSerialNumber}</TableCell>
                <TableCell>{row.assetUpdate}</TableCell>
                <TableCell> 
                <Button style={{backgroundColor:colors.redAccent[500]}} startIcon={<ShoppingCartIcon/>} variant='contained' disabled={row.assetAvailability !== 'Available'} onClick={()=> handleOpen(row.assetNo)}>REQUEST</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Models open={open} show={show} handleClose={handleClose} events={'request'} updateData={updateData}/>
    </div>
  );
}
