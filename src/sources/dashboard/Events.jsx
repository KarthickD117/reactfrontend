import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import * as React from 'react'
import  Button  from '@mui/material/Button'
import  Dialog  from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText  from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { axiosEvent } from '../utils/axiosEvent'
import InputBase from "@mui/material/InputBase";
import '../css/events.css'
import DeleteEvent from '../components/eventDelete'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const dataa = [
    {title:'Event A', date:'2023-01-24',end:'2023-01-28'},
    {title:'Event B', date:'2023-12-25'},
    {title:'Event C', date:'2023-12-25'},
    {title:'Event D', date:'2023-12-28'},
]

function cvtdtpicker(e){
    return (e.$d.getFullYear()+'-'+ ((e.$d.getMonth() < 9) ? ('0'+(e.$d.getMonth()+1)) : (e.$d.getMonth()+1))+'-'+((e.$D < 10)?('0'+(e.$D)):(e.$D)))
}

export default function CalendarEvent() {
    const [open, setOpen] = React.useState(false)
    const [openEvent, setOpenEvent] = React.useState(false)
    const [date, setDate] = React.useState("")
    const [enddate, setendDate] = React.useState("")
    const [resultArray, setResultArray] = React.useState([])
    const [eventData, setEventData] = React.useState({title:'', date:'', end:''})
    const [formData, setFormData] = React.useState('');
    
    const handleOpen = ()=>{
        setendDate('')
        setOpen(true)
    }
    const handleClose =() =>{
        setFormData('')
        setOpen(false);
    }
    const handleCloseEvent = () => setOpenEvent(false)
    const handleDateSelect =(info) =>{
        handleOpen()
        setDate(info.dateStr)
    }
    
    const handleChange = (event) => setFormData(event.target.value)

    const handleStartDateChange = (e) => setDate(cvtdtpicker(e))

    const handleEndDate = (e) => {
        let enddate = cvtdtpicker(e)
        enddate = enddate.split('-')
        enddate[2] =1 + +enddate[2]
        enddate[2] = (enddate[2] < 10)?('0'+(enddate[2])):(enddate[2])
        setendDate(enddate.join('-'))
    }
    const handleEventdrop = async (event) =>{
        let val = {}
        val['title'] = event.oldEvent.title
        val['date'] = event.event.startStr
        val['olddate'] = event.oldEvent.startStr
        val['end'] = event.event.endStr
        try {
            const res = await axiosEvent.post("calendar/updateevent", val)
                .then(response => console.log(response))
        }
        catch(error){
            console.log(error)
        }
    }
    const handleSubmit = async (event) => { 
        let val = {}
        val['title'] = formData
        val['date'] = date
        val['end'] = enddate
        event.preventDefault();
        try { await axiosEvent.post("calendar/",val)
                .then(response => {
              console.log('response is ', response)
              }
            );
        }catch (error) {
          console.log(error);
        }
        fetchData()
        handleClose()
      };

    const fetchData = async () =>{
        try{
            const res = 
            await axiosEvent
              .get("calendar/")
              .then((response) => {
                setResultArray(response.data)
              })
            }
              catch(err){console.log(err)} ;
    }
    React.useEffect(()=>{
        fetchData()
    }, [])
    
    const cli = (event) => {
        setOpenEvent(true)
        console.log(event)
        setEventData({title:event.event.title, date:event.event.startStr,end:event.event.endStr})
    }
  return (
   <>
       
        <FullCalendar
            height={'85%'}
            handleWindowResize = {true}
            editable={true}
            navLinks={false}
            eventDrop={handleEventdrop}
            eventResize={handleEventdrop}
            eventClick={cli}
            headerToolbar ={
                {
                    start:'prev',
                    center:'title',
                    end:'next'
                }
            }
            eventBackgroundColor='yellow'
            eventTextColor='red'
            dateClick={handleDateSelect}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            events={resultArray}
        />
        {open && 
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='dialog-title'
            aria-describedby='dialog-description'
        >
            <DialogTitle>
                Add Event
            </DialogTitle>
            <DialogContent>
                <div className='add-event-container'>
                <div className='event-name'>Event Name:</div>
                <div className='event-input'>
                <InputBase 
                sx={{
                    flex: 1, 
                    backgroundColor:'#f5f5f0', 
                    borderRadius:'4px', 
                    border:1, 
                    ".MuiInputBase-input":{
                        "textIndent":"5px "
                    }}} 
                    placeholder=" Event Title" 
                    name="filter" 
                    onChange={handleChange} 
                    value={formData ? formData : ""}
                />
                </div>
                <div className='date-event'>
                    Start Date:
                </div>
                <div className='start-date-input'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    onAccept={handleStartDateChange}
                    label={'MM-DD-YYYY'}
                    value={dayjs(date)}
                    slotProps={{
                        popper:{
                            placement:'right',
                        }
                    }}
                    views={["year", "month", "day"]} 
                />
            </LocalizationProvider>
                </div>
                <div className='end-date-event'>
                    End Date:
                </div>
                <div className='end-date-input'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                
                onAccept={handleEndDate}
                label={'MM-DD-YYYY'}
                slotProps={{popper:{
                    placement:'right'
                    }}}
                value={dayjs(date)}
                views={["year", "month", "day"]} 
                />
            </LocalizationProvider>
                </div>
                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        No
                    </Button>
                    <Button disabled={formData === ''} onClick={handleSubmit}>
                        Yes
                    </Button>
                </DialogActions>
        </Dialog>}
        {openEvent && 
            <DeleteEvent 
                open={openEvent} 
                handleCloseEvent={handleCloseEvent} 
                eventData={eventData} 
                updateData={fetchData} 
                handleChangeEvent={handleChange}
            />
        }
</>
  );
}
