import {Button} from "@mui/material";
import Form from "react-bootstrap/Form";
import {useLocation, useNavigate} from 'react-router-dom';
import { useContext, useState } from "react";
import React from "react";
import { axiosEvent } from "../utils/axiosEvent";
import '../css/adduser.css'
import FormData from "../components/addForm";
import { empdb } from "../../context";

export default function UpdateEmployee() {
    const val = useContext(empdb)
    const employeeData = useLocation();
    const empData = Object.fromEntries(employeeData.state.entry)
  const [formData, setFormData] = useState(empData);
  const [message, setMessage] = useState('')
    
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('in submit')
    try {
      const response = await axiosEvent.put(`employees/${formData.ps_no}`,
        formData).then(response => {
          if(response.status === 200){
            setMessage('Updated successfully')
            val.userdb=''
          }
        console.log('response of the data is ', response.status)
      });
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();
  const back = () => {
    navigate("/userprofile");
  };

  return (
    <div className="form">
      <fieldset>
        <Form onSubmit={handleSubmit}>
          <FormData formData = {formData} handleChange={handleChange} userlist={employeeData.state.psno}/>
          {message !== '' ?<div className="submit-message">
              *User Updated successfully
            </div>:''}
          <div className="action-group">
            <div className="add-user">
            <Button variant="contained" type="submit" disabled={!((Object.values(formData).every(Boolean)) &&  Object.values(formData).length >= 7)}>
                Update User
              </Button>
            </div>
            <div className="go-back">
            <Button variant="contained" color="secondary" type="button" onClick={back}>
                Go Back
              </Button>
            </div>
          </div>
        </Form>
      </fieldset>
    </div>
  );
}
