import "../css/login.css";
import React, { useState } from "react";
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

export default function Login() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleProp = async (event) => { 
    event.preventDefault();
    try {
      await axiosEvent.post(
        "api/token/", formData 
      ).then(response => {
        setcookie(response.data.access)
        setSessionStorage('token', response.data.access)
        setSessionStorage('username', response.data.username)
        setSessionStorage('firstname',response.data.firstname)
        navigate("/");
        window.location.reload()
      });
    } catch (error) {
      setErrMsg('Invalid Username or Password')
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="login">
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleProp}>
          <div className="Auth-form-content" >
            <h3 className="Auth-form-title">Sign In</h3 >
              <TextField
                sx={{ top: "15px", width: "25ch", gridRow: "1" ,left:60}}
                id="outlined-multiline-flexible"
                label="USERNAME"
                maxRows={4}
                name="username"
                onChange={handleChange}
              />

              <FormControl sx={{ top : '25px' ,width: '25ch',gridRow: '2', left:60}} variant="outlined">
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                  />
              </FormControl>
                    
            <div className="d-grid gap-2 mt-3">
             <div style={{marginLeft:60, marginTop:15, color:'red',fontSize:'12px'}}>{errMsg}</div>
            <Button
              sx={{ top:"30px", width: "100px" ,left:90}}
              type="submit"
              variant="contained"
              color="primary"
            >
              SUBMIT
            </Button>
            </div>
            <br />
            <br />
          </div>
        </form>
      </div>
    </div>
  );
}
