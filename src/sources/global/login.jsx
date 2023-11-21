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
import axios from "axios";
import { getSessionStorage, setSessionStorage } from "../utils/sessionStorage";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
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
      console.log(error);
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
          <div className="close">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="10"
                height="10"
                viewBox="0 0 50 50"
              >
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
              </svg>
            </button>
          </div>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3 >
              <TextField
                sx={{ top: "15px", width: "25ch", gridRow: "1" }}
                id="outlined-multiline-flexible"
                label="USERNAME"
                maxRows={4}
                name="username"
                onChange={handleChange}
              />

              <FormControl sx={{ top : '25px' ,width: '25ch',gridRow: '2'}} variant="outlined">
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
            <Button
              sx={{ top:"40px", width: "100px" }}
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
