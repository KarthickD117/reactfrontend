import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import React from "react";
import { axiosEvent } from "../utils/axiosEvent";
import '../css/adduser.css'
import FormData from "../components/addForm";
import { empdb } from "../../context";
import { getSessionStorage } from "../utils/sessionStorage";

export default function UserData() {
  const val = useContext(empdb)
  const employeeData = useLocation();
  const empData = (employeeData.state)
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
          <FormData formData = {formData} handleChange={handleChange} userlist={empData}/>
          <Form.Group as={Row} className="mb-3">
             <Col xs={2}>
              <Button variant="primary" type="submit">
                Add User
              </Button>
            </Col>
            <Col xs={2}>
              <Button variant="secondary" type="submit" onClick={back}>
                Go Back
              </Button>          
            </Col>
            {message !== '' ?<Col xs={4}><div style={{marginTop:'5px', color:'green', fontSize:'15px'}}>
                User added successfully
                </div></Col>: ''}
            {message !== '' && getSessionStorage('isSuperUser') === "true" ?<Col xs={2}>
              <Button variant="primary" type="button" onClick={back}>
                 Create user
              </Button>          
            </Col>: ''}
          </Form.Group> 
        </Form>
    </div>
  );
}
