import { Button } from "@mui/material";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import React from "react";
import { axiosEvent } from "../utils/axiosEvent";
import '../css/adduser.css'
import FormData from "../components/addForm";
import { empdb } from "../../context";

export default function UserData() {
  const val = useContext(empdb)
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('')
  const [errMsg, setErrmsg] = useState('')

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosEvent.post(
        "employees/", formData
      ).then(response => {
        if (response.status === 201){
          setMessage(response.data)
          val.userdb = ''
        }
      });
    } catch (error) {
      setErrmsg('Error Occured')
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const back = () => {
    navigate("/userprofile");
  };

  return (
    <div className="form">
        <Form onSubmit={handleSubmit}>
          <FormData formData = {formData} handleChange={handleChange}/>
          {message !== '' ?<div className="submit-message">
              *User added successfully
            </div>:''}
          <div className="action-group">
            <div className="add-user">
            <Button variant="contained" type="submit" disabled={!((Object.values(formData).every(Boolean)) &&  Object.values(formData).length >= 7)}>
                Add User
              </Button>
            </div>
            <div className="go-back">
            <Button variant="contained" type="button" onClick={back}>
                Go Back
              </Button>
            </div>
            { false ?<div className="create-user">
            <Button variant="secondary" type="submit">
                Create user
              </Button>
            </div>:''}
          </div>
        </Form>
    </div>
  );
}
