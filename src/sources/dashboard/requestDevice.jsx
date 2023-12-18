import React from "react";
import Form from "react-bootstrap/Form";
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
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { devdb } from "../../context";
import Dialogbox from "../components/dialogbox";

export default function RequestDevice() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const val = useContext(devdb)
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (e, data) => {
    setOpen(true);
    setShow({assetNo:e, assetModel:data})
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const updateData = () => fetchData()
 
  const [resultArray, setResultArray] = useState([]);
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedDeviceBrand, setSelectedDeviceBrand] = useState("");
  const [show, setShow] = useState({ps_no:'', assetNo:'', assetModel:''}) // setassetnumber
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

  useEffect(() => {
    if (val.assetdb===''){ 
      fetchData();
      } else {
        setResultArray(val.assetdb)
      }
  }, []);

  const setOfDeviceType = Array.from(new Set(resultArray.map((data) => data.assetType)))
  const filteredRows = selectedDeviceType !== ''
    ? resultArray.filter((rows) => rows.assetType === selectedDeviceType)
    : resultArray;

  const setOfDeviceBrand = Array.from(new Set(filteredRows.map((data) => data.assetBrand)))
  const secondFilter = selectedDeviceBrand !== ''
  ? filteredRows.filter((rows) => rows.assetBrand === selectedDeviceBrand)
  : filteredRows;
  console.log(selectedDeviceType, selectedDeviceBrand)
  const navigate = useNavigate();
  const goback = () => {
    navigate("/allocate");
  };
  return (
    <div className="mainn" style={{ backgroundColor:colors.grey[900], width:'97%'}}>
      <Container>
        <Row>
          <Col lg='3'>
            <Form.Select size="sm" onChange={handleChange}>
              <option value=''>Device Type</option>
              
              {setOfDeviceType.map((deviceType) => <option value={deviceType}> {deviceType} </option>)}
            </Form.Select>
          </Col>
          <Col lg='3'>
            <Form.Select size="sm" key={selectedDeviceType} onChange={handleBrandChange}>
            <option value=''>Device Type</option>
              
              {setOfDeviceBrand.map((deviceBrand) => <option value={deviceBrand}> {deviceBrand} </option>)}
            </Form.Select>
          </Col>
        </Row>
      </Container>
      <br />
      <TableContainer component={Paper} sx={{width:'99%', marginLeft:'1%'}}>
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
                <TableCell>{row.assetUpdate}</TableCell>
                <TableCell> 
                <Button style={{backgroundColor:colors.redAccent[500]}} startIcon={<ShoppingCartIcon/>} variant='contained' disabled={row.assetAvailability !== 'Available'} onClick={()=> handleClickOpen(row.assetNo, row.assetModel)}>REQUEST</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialogbox open={open} handleClose={handleClose} show={show} updateData={updateData}/>
    </div>
  );
}
