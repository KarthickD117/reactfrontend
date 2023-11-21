import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { axiosEvent } from "../utils/axiosEvent";
import '../css/adduser.css'
import FormData from "../components/addForm";

export default function UserData() {
 
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState('')
  const handleRadioChange = (e) => setSelectedOption(e.target.value)
  console.log('form in add user comp', formData)
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log('form in add user comp', formData)
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosEvent.post(
        "employees/", formData
      ).then(response => {
        console.log('response of the data is ', response)
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
      <fieldset>
        <Form onSubmit={handleSubmit}>
          <FormData formData = {formData} handleChange={handleChange}/>
          <Form.Group as={Row} className="mb-3">
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
          </Form.Group>
        </Form>
      </fieldset>
    </div>
  );
}
