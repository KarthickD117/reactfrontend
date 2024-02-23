import { useEffect, useState, useContext } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid'
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { taskDetail } from "../../context";
import { axiosEvent } from "../utils/axiosEvent";
import { Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const style = {
    width:'80%',
    marginTop:'2%',
    '& legend': { display: 'none' },
    '& fieldset': { top: 0 },
    '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }
}
export default function TaskView(){
    const task = useContext(taskDetail)
    const taskNo = useLocation();
    const navigate = useNavigate();
    var taskNumber
    let events
    const [data, setData] = useState(0)
    const [msg, Setmsg] = useState({msg:'', color:''})
    const [resultArray, setResultArray] = useState([])
    const [taskData, settaskData] = useState()
    const [errorData, setError] = useState({
        ReleaseName:false, TestRaidId:false, Category:false,TestRail:false,
        Build:false,DefectLink:false,TotalTC:false,Poc:false,Status:true
    })
    const styles = (wid) => {
        return {
            width:wid,
            marginTop:'2%',
            '& legend': { display: 'none' },
            '& fieldset': { top: 0 },
            '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }
        }
    }
    const addComment = () => {
        taskData.Comment[`comment${Object.keys(taskData.Comment).length}`] = ''
        settaskData({...taskData})
    }
    const handleTestRaidID = (e) => {
        settaskData({...taskData,[e.target.name]:e.target.value})
        if(e.target.value !== ''){
            setError({...errorData,[e.target.name]:true})
        }else{
            setError({...errorData,[e.target.name]:false})
        }
    }
    const handlejson =(e) =>{
        taskData.CurrentCount[e.target.name] = Number(e.target.value)
        settaskData({...taskData})
    }
    const handleComment = (e) => {
        taskData.Comment[e.target.name] = e.target.value
        settaskData({...taskData})
    }

    const postData = async (event)=>{
        Setmsg({msg:'', color:''})
        event.preventDefault();
        const postData = JSON.parse(JSON.stringify(taskData))
        postData.Comment = JSON.stringify(postData.Comment)
        postData.CurrentCount = JSON.stringify(postData.CurrentCount)
        const URL = events ==='a' ? 'tasks/' : 'tasks/update'
        try {
            await axiosEvent.post(URL,postData)
              .then(async response => {
                Setmsg({msg:response.data, color:'green'})
                }
              );
          }catch (error) {
            Setmsg({msg:'Error Occured', color:'red'})
            console.log(error);
          }
    }
    useEffect(() => {
        settaskData(taskNumber)
    }, []);
    try{
        taskNumber= Object.fromEntries(taskNo.state.actData)
        events = taskNo.state.data
        
    }
    catch{
        return null
    }
    if(taskData == undefined){
        return null
    }
    
    return (
        <div className='main-container' style={{marginLeft:'2.5%', height:'87%', overflow:'auto'}}>
            <div> <h3>Task</h3></div>
            <Grid container rowGap={1}>
                <Grid item xs={2} sx={{alignSelf:'center'}}>
                    Release Name
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        sx={styles('80%')}
                            onChange={handleTestRaidID}
                            id="build-release"
                            name="ReleaseName"
                            label='Release Name'
                            value={taskData.ReleaseName || ''}
                    />
                </Grid>
                <Grid xs={4}>
                </Grid>
                <Grid item xs={2} sx={{alignSelf:'center'}}>
                    Test Rail ID
                </Grid>
                    <Grid item xs={6}>
                        <TextField
                            sx={styles('80%')}
                                onChange={handleTestRaidID}
                                id="test-rail-id"
                                name="TestRaidId"
                                label="TestRaidId"
                                value={taskData.TestRaidId || ''}/>
                    </Grid>
                    <Grid xs={4}>
                    </Grid>
                    <Grid item xs={2} sx={{alignSelf:'center'}}>
                        Category
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            sx={styles('80%')}
                            id="category"
                            value={taskData.Category || ''}
                            label="Category"
                            fullWidth='true'
                            name="Category"
                            onChange={handleTestRaidID}
                            onClose={() => {
                                setTimeout(() => {
                                  document.activeElement.blur();
                                }, 0);
                            }}
                        >
                            <MenuItem value='' hidden>Category</MenuItem>
                            <MenuItem value="Release">Release</MenuItem>
                            <MenuItem value='Adhoc'>Adhoc</MenuItem>
                            <MenuItem value='Defect retest'>Defect retest</MenuItem>
                            <MenuItem value='Others'>Others</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={2} sx={{alignSelf:'center'}}>
                        Test Rail Link
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            sx={styles('100%')}
                            onChange={handleTestRaidID}
                            id="test-run-link"
                            label="Test Rail"
                            name="TestRail"
                            value={taskData.TestRail || ''}
                        />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={2} sx={{alignSelf:'center'}}>
                        Build Link
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            sx={styles('100%')}
                            onChange={handleTestRaidID}
                            id="build-link"
                            name="Build"
                            label="Build"
                            value={taskData.Build || ''}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={2} sx={{alignSelf:'center'}}>
                        Defect Link
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            sx={styles('100%')}
                            onChange={handleTestRaidID}
                            id="defect-link"
                            name="DefectLink"
                            label="Defect Link"
                            value={taskData.DefectLink || ''}
                        />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={1} sx={{alignSelf:'center'}}> Total TC </Grid>
                    <Grid item xs={1}>
                        <TextField
                            sx={styles('80%')}
                            onChange={handleTestRaidID}
                            type="number"
                            id="total-count"
                            name="TotalTC"
                            label="0"
                            value={taskData.TotalTC || ''}
                        />
                    </Grid>
                    <Grid item xs={1} sx={{alignSelf:'center'}}>
                        Passed
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            sx={styles('80%')}
                            onChange={handlejson}
                            id="passed-count"
                            label="0"
                            name="passed"
                            value={taskData.CurrentCount.passed || ''}
                        />
                    </Grid>
                    <Grid item xs={1} sx={{alignSelf:'center'}}>
                        Failed
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            onChange={handlejson}
                            sx={styles('80%')}
                            id="outlined-multiline-flexible"
                            name="failed"
                            label="0"
                            value={taskData.CurrentCount.failed || ''}
                        />
                    </Grid>
                    <Grid item xs={1} sx={{alignSelf:'center'}}>
                        Blocked
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            onChange={handlejson}
                            sx={styles('80%')}
                            id="outlined-multiline-flexible"
                            name="blocked"
                            label="0"
                            value={taskData.CurrentCount.blocked || ''}
                        />
                    </Grid>
                    <Grid item xs={1} sx={{alignSelf:'center'}}>
                        Retest
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            onChange={handlejson}
                            sx={styles('80%')}
                            id="outlined-multiline-flexible"
                            name="retest"
                            label="0"
                            value={taskData.CurrentCount.retest || '0'}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2} sx={{alignSelf:'center'}}>
                        POC
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            sx={styles('80%')}
                            onChange={handleTestRaidID}
                            id="poc"
                            name="Poc"
                            label="Point of Contact"
                            value={taskData.Poc || ''}
                        />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={2} sx={{alignSelf:'center'}}>
                        Status
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            id="status"
                            label="Status"
                            sx={styles('80%')}
                            value={taskData.Status || 'To Do'}
                            onChange={handleTestRaidID}
                            name="Status"
                            onClose={() => {
                                setTimeout(() => {
                                  document.activeElement.blur();
                                }, 0);
                            }}
                        >
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value='In Progress'>In Progress</MenuItem>
                    <MenuItem value='Completed'>Completed</MenuItem>
                </Select>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    {Object.entries(taskData.Comment).map((row, index) => (
                        <>
                        <Grid item xs={2} sx={{alignSelf:'center'}}>
                            Comment {index + 1}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                onChange={handleComment}
                                sx={styles('90%')}
                                id={row[0]}
                                label="comment"
                                name={row[0]}
                                value={row[1] || ''}
                                multiline
                            />
                        </Grid>
                        {Object.values(taskData.Comment).length - 1 != index &&
                        <Grid item xs={3}></Grid>}
                        {Object.values(taskData.Comment).length - 1 == index && <Grid item xs={1} sx={{alignSelf:'end'}}>
                        <IconButton onClick={addComment}
                            sx={{color:'white',backgroundColor:'blue',':hover':{
                                backgroundColor:'lightblue'
                            }}}> 
                            <AddIcon /> 
                            </IconButton>
                        </Grid>        
                        }
                        </>
                        ))}
                
                        <Grid item xs={4} ><Button
                            sx={{height:'35px', width:'100px', backgroundColor:'blue', marginTop:'5%',marginBottom:'15%',
                                '&:hover': {
                                    backgroundColor: 'lightblue',
                                    color: '#3c52b2',
                                }}}
                            variant="contained"
                            onClick={() => navigate("/tasks")}
                        >
                            Back
                        </Button></Grid>
                        
                <Grid item xs={3}>
                    
                <Button
                    sx={{height:'35px', width:'100px', backgroundColor:'blue', marginTop:'5%',marginBottom:'15%',
                        '&:hover': {
                            backgroundColor: 'lightblue',
                            color: '#3c52b2',
                        }}}
                    disabled={!Object.values(taskData).every(Boolean)}
                    variant="contained"
                    onClick={postData}
                >
                    Submit
                </Button>
                
                </Grid>
                {msg.msg != '' ? <Grid item xs={4}><div style={{marginTop:'5%', color:msg.color}}>{msg.msg}</div></Grid>:''}
            </Grid>
        </div>
    )
} 