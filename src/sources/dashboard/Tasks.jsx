import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Link } from '@mui/material';
import { Button } from "@mui/material";
import { axiosEvent } from '../utils/axiosEvent';
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid'
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { taskDetail } from '../../context';
import Box from '@mui/material/Box';
import '../css/tasks.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getSessionStorage } from "../utils/sessionStorage";

export default function Tasks() {
    const navigate = useNavigate()
    const task = useContext(taskDetail)
    const [resultArray, setResultArray] = useState([]);
    const [filters, setFilter] = useState([])
    const [data, setData] = useState(0)
    const [open, setOpen] = useState(false)
    const [Status, setStatus] = useState('In Progress')
    const [taskNumber, setTaskNumber] = useState('')
    const [taskData, setTaskData] = useState({
        ReleaseName:'', TestRaidId:'', Category:'Release',TestRail:'',
        Build:'',DefectLink:'',Comment:{
            comment0:''
        },TotalTC:'', CurrentCount:{
            passed:'',failed:'',blocked:'',retest:''
        },Poc:'',Status:'To Do'
    })

    const handleCategoryChange = (event) => {
        setStatus(event.target.value)
        setFilter(filterr(resultArray,event.target.value))
        setTaskNumber('')
    }
    const handleEventOpen = (e) => {
        setTaskNumber(String(e))
        setOpen(true)
    }
    const handleClose =() => setOpen(false)
    function filterr(data,filterdata){
        return data.filter((row)=> row.Status == filterdata )
    }
    const fetchTaskData = async () => {
        await axiosEvent.get("tasks/")
          .then((response) => {
            setResultArray(response.data)
            task.tasksData = response.data
            setFilter(filterr(response.data,Status))
          })
          .catch((err) => console.log(err));
        };

    useEffect(() => {
        fetchTaskData();
    }, []);

    if (resultArray.length === 0){
        return null
    }
    
    const handleOpen = (e) => {
        navigate('/tasksview', {state:{data:'u', actData:Object.entries(filters[e])}})
    }
    const handleadd = () => {
        navigate('/tasksview', {state:{data:'a',actData:Object.entries(taskData)}})
    }

    return (
        <div className='main-container' style={{height:'88%', backgroundColor:'#e0e0e0',paddingTop:'5px',overflowY:'auto'}}>
                <Box sx={{marginBottom:'2%',display:'flex',justifyContent: 'space-between',}}>
                <Select
                    id="category"
                    label="Category"
                    sx={{width:'15%', marginLeft:'2.5%','& legend': { display: 'none' },
                    '& fieldset': { top: 0 },bgcolor: 'background.paper',
                    '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" },
                    "& .MuiOutlinedInput-notchedOutline": {border: "none"},
                    }}
                    onClose={() => {
                        setTimeout(() => {
                          document.activeElement.blur();
                        }, 0);
                      }}
                    value={Status}
                    onChange={handleCategoryChange}
                    name="Category"
                >
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value='In Progress'>In Progress</MenuItem>
                    <MenuItem value='Completed'>Completed</MenuItem>
                </Select>
                <Button
                    sx={{height:'100%', width:'10%', marginTop:'1%',backgroundColor:'blue',
                        marginRight:'5%',
                        '&:hover': {
                            backgroundColor: 'lightblue',
                            color: '#3c52b2',
                        },}}
                        onClick={handleadd}
                    variant="contained"
                    name="filehandler"
                >
                    Add
                </Button>

            </Box>
            <div style={{marginLeft:"2.5%"}}>
                <Grid container>
                    {filters.map((row, index) => (
                        // <Grid className='card-grid' item xs={8}>
                        // <Card sx={{width:'90%', minHeight:'80%', marginBottom:'2%' }} 
                        //     key={index}>
                        //     <CardActionArea sx={{minHeight:'100%'}} onClick={() => handleEventOpen(index)}>
                        //         <CardContent>
                        //         <div>
                        //             <h4>
                        //                 {row.ReleaseName}
                        //             </h4>
                        //         </div>
                        //         <div>
                        //             <h6>
                        //                 Test Rail ID: {row.TestRaidId}
                        //             </h6>
                        //         </div>
                        //         <div className='detailed-report'>
                        //             <div className='passed-row' >Passed:&nbsp;</div>
                        //             <div className='passed-count'>
                        //                 {row.CurrentCount.passed}
                        //             </div>
                        //             <div className='failed-row' >Failed:&nbsp;</div>
                        //             <div className='failed-count'>
                        //                 {row.CurrentCount.failed}
                        //             </div>
                        //         </div>
                        //         <Grid container>
                        //             <Grid item xs={3}>
                        //             Latest comment:
                        //             </Grid>
                        //             <Grid item xs={9} sx={{backgroundColor:'aqua', color:'red'}}>
                        //             {Object.values(row.Comment)[(Object.values(row.Comment).length)-1]}
                        //             </Grid>
                        //             <Grid item xs={3}>
                        //                 POC
                        //             </Grid>
                        //             <Grid item xs={9}>
                        //                 {row.Poc}
                        //             </Grid>
                        //             <Grid item xs={3}>
                        //                 Status
                        //             </Grid>
                        //             <Grid item xs={9}>
                        //                 {row.Status}
                        //             </Grid>
                        //         </Grid>
                        //         </CardContent>
                        //     </CardActionArea>
                        //     {getSessionStorage('isAdmin') === 'true' ?<CardActions>
                        //         <Button size="small" variant='contained' 
                        //         sx={{backgroundColor:'blue',
                        //         '&:hover': {
                        //             backgroundColor: 'lightblue',
                        //             color: '#3c52b2',
                        //         },}} 
                        //         onClick={() => handleOpen(index)}>
                        //             EDIT / MODIFY
                        //         </Button>
                        //     </CardActions>:''}
                        // </Card>
                        // </Grid>
                        <Card sx={{display:'flex', width:'95%', marginBottom:'1%'}}>
                            <Box sx={{display:'flex', flexDirection:'column',alignSelf:'center'}}>
                            <CardContent sx={{flex: '1 0 auto', width:'20vw'}}>
                                <h5 className='release-title'>
                                    {row.ReleaseName}
                                </h5>
                            </CardContent>
                            </Box>
                            <CardContent sx={{width:'80%'}}>
                            <CardActionArea className='card-action-area' sx={{minHeight:'100%'}} onClick={() => handleEventOpen(index)}>
                            <div>
                                <Grid container>
                                    <Grid item xs={10}>
                                    <h6>
                                        Test Rail ID: {row.TestRaidId}
                                    </h6>
                                    </Grid>
                                    <Grid item xs={2}>
                                {getSessionStorage('isAdmin') === 'true' ?
                                <CardActions>
                                    <Button size="small" variant='contained' 
                                    sx={{backgroundColor:'blue',
                                    '&:hover': {
                                        backgroundColor: 'lightblue',
                                        color: '#3c52b2',
                                    },}} 
                                    onClick={() => handleOpen(index)}>
                                        EDIT / MODIFY
                                    </Button>
                                </CardActions>:''}
                                    </Grid>
                                </Grid>
                             </div>
                             <div className='detailed-report'>
                                 <div className='passed-row' >Passed:&nbsp;</div>
                                 <div className='passed-count'>
                                     {row.CurrentCount.passed}
                                    </div>
                                 <div className='failed-row' >Failed:&nbsp;</div>
                                 <div className='failed-count'>
                                     {row.CurrentCount.failed}
                                 </div>
                             </div>
                             <Grid container sx={{width:'100%'}}>
                                 <Grid item xs={3}>
                                 Latest comment:
                                 </Grid>
                                 <Grid item xs={9} sx={{color:'red'}}>
                                 {Object.values(row.Comment)[(Object.values(row.Comment).length)-1]}
                                 </Grid>
                                 <Grid item xs={3}>
                                     POC
                                 </Grid>
                                 <Grid item xs={9}>
                                     {row.Poc}
                                 </Grid>
                                 <Grid item xs={3}>
                                     Status
                                 </Grid>
                                 <Grid item xs={9}>
                                        {row.Status}
                                 </Grid>
                             </Grid>
                             </CardActionArea>
                            </CardContent>
                        </Card>
                    ))
                }
                </Grid>
            </div>
            <Dialog
        open={open}
        
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Task"}
        </DialogTitle>
        <DialogContent>
            {taskNumber !='' ? 
            <Grid container>
                <Grid item xs={3}>Release Name</Grid>
                <Grid item xs={9}>{filters[Number(taskNumber)].ReleaseName}</Grid>
                <Grid item xs={3}>Test Rail ID</Grid>
                <Grid item xs={9}>{filters[Number(taskNumber)].TestRaidId}</Grid>
                <Grid item xs={3}>Test Rail</Grid>
                <Grid item xs={9}><a href={filters[Number(taskNumber)].TestRail} underline="hover" target="blank">{filters[Number(taskNumber)].TestRail}</a></Grid>
                <Grid item xs={3}>Build</Grid>
                <Grid item xs={9}><a href={filters[Number(taskNumber)].Build} underline="hover" target="blank">{filters[Number(taskNumber)].Build}</a></Grid>
                <Grid item xs={3}>Defect Link</Grid>
                <Grid item xs={9}><a href={filters[Number(taskNumber)].DefectLink} underline="hover" target="blank">{filters[Number(taskNumber)].DefectLink}</a></Grid>
                <Grid item xs={3}>Total TC:</Grid>
                <Grid item xs={9}>{filters[Number(taskNumber)].TotalTC}</Grid>
                <Grid item xs={1}>Passed:</Grid>
                <Grid item xs={1}>{filters[Number(taskNumber)].CurrentCount.passed}</Grid>
                <Grid item xs={1}>Failed:</Grid>
                <Grid item xs={1}>{filters[Number(taskNumber)].CurrentCount.failed}</Grid>
                <Grid item xs={1}>Block:</Grid>
                <Grid item xs={1}>{filters[Number(taskNumber)].CurrentCount.blocked}</Grid>
                <Grid item xs={1}>Retest:</Grid>
                <Grid item xs={1}>{filters[Number(taskNumber)].CurrentCount.retest}</Grid>
            </Grid>
            :''}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
        </div>
  );
}
