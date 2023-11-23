import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { axiosEvent } from "../utils/axiosEvent";
import detailsRows from "../components/rowMaping";
import { Routes, Route, useNavigate } from "react-router-dom";
import StickyTable from "../components/table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
const columns = [
  { id: "assetNo", label: "Asset No", width: 85 },
  { id: "assetType", label: "Asset Type", width: 85 },
  { id: "assetBrand", label: "Asset Brand", width: 85 },
  { id: "assetModel", label: "Asset Model", width: 85 },
  {
    id: "assetSerialNumber",
    label: "Asset Serial No",
    width: 85,
  },
  { id: "Firstname", label: "Borrower Name", width: 85 },
  { id: "dateBorrowed", label: "Date Borrowed", width: 100 },
  { id: "dateReturned", label: "Return Date", width: 100 },
  { id: "duration", label: "Duration", width: 85 },
];

export default function Report() {

  const [resultArray, setResultArray] = useState([]);
  const [datePicker, setdatePicker] = useState('date')
  const [selected, setSelected] = useState('true')
  const [month, setMonth] = useState()
  const fetchData = async (year) => {
    console.log(typeof year)
    await axiosEvent.get(`devicedate/${year}`)
      .then((response) => setResultArray(response.data))
      .catch((err) => console.log(err));
  };
  const details = detailsRows(resultArray)
  const handleChange= (e)=> {
    setResultArray([])
    setdatePicker(e.target.value)
  }
  const handleChangeDate = (e) => {
    if (datePicker == 'month') {
    const val = (e.$d.getFullYear()+'-'+ ((e.$d.getMonth() < 9) ? ('0'+(e.$d.getMonth()+1)) : (e.$d.getMonth()+1)))
    fetchData(val)
    }
    if (datePicker == 'date') {
      console.log(e)
      const val = (e.$d.getFullYear()+'-'+ ((e.$d.getMonth() < 9) ? ('0'+(e.$d.getMonth()+1)) : (e.$d.getMonth()+1))+'-'+e.$D)
      fetchData(val)
    }
  }
  console.log('date picker', datePicker)
  return (
    <>
        <Container>
        <Row>
          <Col lg="3">
            <Form.Select size="sm" onChange={handleChange}>
              <option value = 'date'> DATE </option>
              <option value='month'> MONTH </option>
            </Form.Select>
          </Col>
          <Col>
          {datePicker =='month' &&
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onAccept={handleChangeDate}
                label={'MM'}
                views={["month" ]}
              />
            </LocalizationProvider>} 
            {datePicker=='date' && <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onAccept={handleChangeDate}
              label={'DD-MM-YYYY'}
              views={["year", "month", "day"]} 
            />
          </LocalizationProvider>
            }
          </Col>
        </Row>
        </Container>
         
    <StickyTable columns={columns} data={details} />
    </>
  );
}
