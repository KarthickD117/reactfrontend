import "../css/log.css";
import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import {setcookie} from "../utils/cookieSet";
import { useNavigate } from "react-router-dom";
import { axiosEvent } from "../utils/axiosEvent";
import { getSessionStorage, setSessionStorage } from "../utils/sessionStorage";
import { CircularProgress } from "@mui/material";
import { perm } from "../../context";

export default function Login() {
  const val = useContext(perm)
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleProp = async (event) => { 
    setLoading(true)
    setErrMsg('')
    event.preventDefault();
    try {
      await axiosEvent.post(
        "api/token/", formData 
      ).then(response => {
        setcookie(response.data.access)
        setSessionStorage('token', response.data.access)
        setSessionStorage('username', response.data.username)
        setSessionStorage('firstname',response.data.firstname)
        setSessionStorage('isAdmin', response.data.isAdmin)
        setSessionStorage('isSuperUser',response.data.isSuperUser)
        navigate("/");
        window.location.reload()
      });
    } catch (error) {
      setLoading(false)
      if(error.code ==='ERR_NETWORK'){
        setErrMsg('* Network Error, Please try again')
      }
      else if (error.code === 'ERR_BAD_REQUEST'){
        setErrMsg('* Invalid Credentials')
      }
      
    }
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <div className="main-containter">
      <form className="Auth-form" onSubmit={handleProp}>
        <div className="form-container">
           <div className="sign-in">
            <span className="name">LOGIN</span>
           </div>
           <div className="user-name">
              <TextField
                sx={{ width: "100%"}}
                id="outlined-multiline-flexible"
                label="USERNAME"
                maxRows={4}
                name="username"
                onChange={handleChange}
              />
           </div>
           <div className="pwd">
           <FormControl sx={{ width: '100%'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"    
                    onChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ?  <Visibility />: <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                  />
              </FormControl>
           </div>
           <div style={{gridArea:'4/2/5/4', alignSelf:'flex-end', color:'red', fontSize:'13px'}}>
           {errMsg}
           </div>
           <div className="btn">
           <Button disabled={loading}
              sx={{ width: "100px" }}
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleProp}
            >
              SUBMIT &nbsp;
              {loading && <CircularProgress size={'15px'} style={{color:'black'}}/>}
            </Button>
           </div>

        </div>
        </form>
    </div>
  );
}
