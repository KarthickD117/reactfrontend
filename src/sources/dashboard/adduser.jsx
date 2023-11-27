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

export default function UserData() {
  const val = useContext(empdb)
  const employeeData = useLocation();
  const empData = (employeeData.state)
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('')

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
          setTimeout(() => {
            back()
          }, 3000);
        }
      });
    } catch (error) {
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
          {message ==='' ? <Form.Group as={Row} className="mb-3">
             <Col xs={2}>
              <Button variant="outline-primary" type="submit">
                Add User
              </Button>
            </Col>
            <Col xs={2}>
              <Button variant="outline-secondary" type="submit" onClick={back}>
                Go Back
              </Button>
            </Col>
          </Form.Group> : <div style={{marginTop:'40px', marginLeft:'10px', color:'green'}}>
                User added successfully will navigate to userprofile in few seconds
                </div>
            }
        </Form>
    </div>
  );
}
