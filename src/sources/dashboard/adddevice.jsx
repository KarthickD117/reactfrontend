import { Button } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import '../css/adddevice.css';
import * as React from "react";
import { axiosEvent } from "../utils/axiosEvent";
import { devdb } from "../../context";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function Formdata() {
  const val = useContext(devdb)
  const [formData, setFormData] = useState({});
  const [resultArray, setResultArray] = useState([])
  const [msg, setmsg] = useState({msg:'', color:''})
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
  const assetNoList = resultArray.map(row => row.assetNo)
  console.log(assetNoList.includes(Number(formData.assetNo)))
  const styles = (wid) => {
    return {
        width:wid,
        marginTop:'2%',
        '& legend': { display: 'none' },
        '& fieldset': { top: 0 },
        '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }
    }
}
  const handleSubmit = async (event) => { 
    event.preventDefault();
    try {
      await axiosEvent.post("devices/",formData)
        .then(response => {
          console.log('response is ', response)
          val.assetdb = ''
          setmsg({msg:'Device has been saved', color:'green'})
          }
        );
    }catch (error) {
      console.log(error);
      setmsg({msg:'Error Occured. Try Again', color:'red'})
    }
  };

  const navigate = useNavigate();
    const back = () => {
      
      navigate("/devicemanagement");
    };
    const fetchData = async () => {
      await axiosEvent
        .get("devices/")
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
      }
      else{
        setResultArray(val.assetdb)
      }
    }, []);
  return (
    <div className="formdevice">
      <fieldset>
        <Form onSubmit={handleSubmit}>
          <Grid container className="deviceFormPage" paddingLeft={'2%'} rowGap={2}>
            <Grid item xs={2} sx={{alignSelf:'center'}}>
              Asset No
            </Grid>
            <Grid item xs={9}>
              <TextField
                sx={styles('60%')}
                onChange={handleChange}
                id="asset-no"
                name="assetNo"
                value={formData.assetNo || ''}
                error={assetNoList.includes(Number(formData.assetNo))}
                helperText={assetNoList.includes(Number(formData.assetNo)) ? 'Asset already exists':''}
              />
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              Asset Type
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={styles('60%')}
                  onChange={handleChange}
                  id="asset-type"
                  name="assetType"
                  value={formData.assetType || ''}
                />
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              Asset Brand
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={styles('60%')}
                  onChange={handleChange}
                  id="asset-brand"
                  name="assetBrand"
                  value={formData.assetBrand || ''}
                />
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              Asset Model
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={styles('60%')}
                  onChange={handleChange}
                  id="asset-Model"
                  name="assetModel"
                  value={formData.assetModel || ''}
                />
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              Year
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={styles('60%')}
                  onChange={handleChange}
                  id="asset-year"
                  name="assetYear"
                  value={formData.assetYear || ''}
                />
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              OS Version
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={styles('60%')}
                  onChange={handleChange}
                  id="asset-osversion"
                  name="assetOsVersion"
                  value={formData.assetOsVersion || ''}
                />
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              Asset Serial No
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={styles('60%')}
                  onChange={handleChange}
                  id="asset-serial-no"
                  name="assetSerialNumber"
                  value={formData.assetSerialNumber || ''}
                />
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              Asset Location
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={styles('60%')}
                  onChange={handleChange}
                  id="asset-location"
                  name="assetLocation"
                  value={formData.assetLocation || ''}
                />
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              Auto Update
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={styles('60%')}
                  onChange={handleChange}
                  id="asset-Update"
                  name="assetUpdate"
                  value={formData.assetUpdate || ''}
                />
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              Auto Ownership
              </Grid>
              <Grid item xs={9}>
                <TextField
                  sx={styles('60%')}
                  onChange={handleChange}
                  id="asset-ownership"
                  name="assetOwnership"
                  value={formData.assetOwnership || ''}
                />
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              <Button variant="contained" type="button" onClick={back}>
                Go Back
              </Button>
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              <Button variant="contained" 
                sx={{backgroundColor:'blue' }}
                type="submit" disabled={!((Object.values(formData).every(Boolean)) &&  Object.values(formData).length >= 10)}>
                Add Device
              </Button>
              </Grid>
              <Grid item xs={2} sx={{alignSelf:'center'}}>
              {msg.msg!= '' ? <div style={{color:msg.color}}>{msg.msg}</div>:''}
              </Grid>
          </Grid>
          
        </Form>
      </fieldset>
    </div>
  );
}
