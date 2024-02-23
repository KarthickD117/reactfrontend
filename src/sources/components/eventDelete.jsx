import React, { useEffect, useState, useRef } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { axiosEvent } from "../utils/axiosEvent";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputBase from "@mui/material/InputBase";

export default function DeleteEvent ({open, handleCloseEvent, eventData, handleChangeEvent, updateData}) {
    const [selectedDate, setSelectedDate] = useState('')
	const [title, setTitle] = useState(eventData.title)
    const [initialVal, setInitialVal] = useState(eventData.title)
    const handleChangeDate = (e) => {
		const val = (e.$d.getFullYear()+'-'+ ((e.$d.getMonth() < 9) ? ('0'+(e.$d.getMonth()+1)) : (e.$d.getMonth()+1))+'-'+e.$D)
		setSelectedDate(val)
		if (val == eventData.date){
			setSelectedDate('')
		}
    }
	const handleChange = (event) => {
		setTitle(event.target.value)
	}
   
    const handleUpdate = async (event) => {
		event.preventDefault()
		let val = {}
		val['oldtitle'] = eventData.title
		val['olddate'] = eventData.date
		if( selectedDate == ''){
			val['date']= eventData.date
		}
		else{
			val['date'] = selectedDate
		}
		val['title'] = title
		try {
            const res = await axiosEvent.post("calendar/update", val)
                .then(response => {
					console.log(response)
					updateData()
				})
        }
        catch(error){
            console.log(error)
        }
		handleCloseEvent()
    }

    const handleDelete = async (event) =>{
        event.preventDefault();
        try{
      		const res = await axiosEvent.delete("calendar/", {data: eventData}).then(
        		(response) => {
          			console.log(response.data)
          			updateData()
        		}
      		)
		}catch(error){
			console.log(error)
		}
		handleCloseEvent()
	}

    return (
        <Dialog
        open={open}
        onClose={handleCloseEvent}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      	>
        <DialogTitle id="alert-dialog-title">
          {"Device Request"}
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
						value={title ? title : ""}
					/>
            	</div>
            	<div className='date-event'>
                	Start Date:
            	</div>
            	<div className='start-date-input'>
          			<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
						onAccept={handleChangeDate}
						label={'MM-DD-YYYY'}
						value={dayjs(eventData.date)}
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
                
                onAccept={handleChangeDate}
                label={'MM-DD-YYYY'}
                slotProps={{popper:{
                    placement:'right'
                    }}}
                value={eventData.end != '' ?dayjs(eventData.end): dayjs(eventData.date)}
                views={["year", "month", "day"]} 
                />
            </LocalizationProvider>
                </div>
          	</div>
        </DialogContent>
        <DialogActions>
          	<Button onClick={handleDelete} disabled ={selectedDate != '' || initialVal != title} >Delete</Button>
          	<Button onClick={handleUpdate} disabled ={selectedDate == '' && initialVal == title} >Update</Button>
          	<Button onClick={handleCloseEvent}> Close </Button>
        </DialogActions>
      </Dialog>
    )
}