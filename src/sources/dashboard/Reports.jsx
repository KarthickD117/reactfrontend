import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { axiosEvent } from "../utils/axiosEvent";
import detailsRows from "../components/rowMaping";
import StickyTable from "../components/table";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
const columns = [
  { id: "assetNo", label: "Asset No", width: 85 },
  { id: "assetType", label: "Asset Type", width: 85 },
  { id: "assetBrand", label: "Asset Brand", width: 85 },
  { id: "assetModel", label: "Asset Model", width: 50 },
  { id: "Firstname", label: "Borrower Name", width: 85 },
  { id: "dateBorrowed", label: "Date Borrowed", width: 100 },
  { id: "dateReturned", label: "Return Date", width: 100 },
  { id: "duration", label: "Duration", width: 85 },
];

export default function Report() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [resultArray, setResultArray] = useState([]);
  const [datePicker, setdatePicker] = useState('month')
  const [initVal, setInitialVal] = useState('')

  const fetchData = async (year) => {
    await axiosEvent.get(`devicedate/${year}`)
      .then((response) => setResultArray(response.data))
      .catch((err) => console.log(err));
  };
  const details = detailsRows(resultArray)
  const handleChange= (e)=> {
    setResultArray([])
    setInitialVal('')
    setdatePicker(e.target.value)
  }
  const handleChangeDate = (e) => {
    if (datePicker === 'month') {
    const val = (e.$d.getFullYear()+'-'+ ((e.$d.getMonth() < 9) ? ('0'+(e.$d.getMonth()+1)) : (e.$d.getMonth()+1)))
    fetchData(val)
    console.log(val)
    }
    if (datePicker === 'date') {
      const val = (e.$d.getFullYear()+'-'+ ((e.$d.getMonth() < 9) ? ('0'+(e.$d.getMonth()+1)) : (e.$d.getMonth()+1))+'-'+((e.$D < 10)?('0'+(e.$D)):(e.$D)))
      fetchData(val)
    }
  }
  
  useEffect(() =>{
    const d = new Date()
    const currentMonth = d.getFullYear()+'-'+ ((d.getMonth() < 9) ? ('0'+(d.getMonth()+1)) : (d.getMonth()+1))
    setInitialVal(currentMonth)
    fetchData(currentMonth)
  }, [])
  return (
    <div style={{ height:'92vh'}}>
    <div style={{display:'grid', gridTemplateColumns:'50% 50%', gridTemplateRows:'100%', width:'50vh',marginLeft:'2.5%', marginBottom:'2%'}}>
      <div style={{gridArea:'1/1/1/1'}}>
        <Form.Select size="sm" onChange={handleChange} style={{height:'100%', width:'90%', marginTop:'3%'}}>
          <option value='month'> MONTH </option>
          <option value = 'date'> DATE </option>
        </Form.Select>
      </div>
      <div style={{gridArea:'1/2/1/2',  marginTop:'3%'}}>
      {datePicker =='month' &&
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onAccept={handleChangeDate}
                label={'MMMM'}
                value={initVal ? dayjs(initVal) : null}
                views={["month",'year' ]}
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
      </div>
    </div>
    <StickyTable columns={columns} data={details} />
    </div>
  );
}
