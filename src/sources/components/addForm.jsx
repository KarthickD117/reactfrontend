import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import React from "react";
import '../css/adduser.css'

const FormData = ({ formData,handleChange,userlist}) => {
  const location = useLocation()
  const initialVal = useRef('')
  function checkform(){
    if (location.pathname ==='/adduser'){
      if (userlist.includes(Number(formData.ps_no))){
        return true
      } else {
        return false
      }
    }
    if (location.pathname === '/updateemployee'){
      if ((initialVal.current )=== (Number(formData.ps_no)) || initialVal.current === ''){
        return false
      } else if (userlist.includes(Number(formData.ps_no))){
        return true
      } else {
        return false
      }
    }
  }
  useEffect(() => {
    initialVal.current = Number(formData.ps_no)
  },[])
  return (
    <div>
     <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
      <Form.Label column sm={2}>
              Employee ID
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="Employee ID" 
                placeholder="Employee ID"
                isInvalid={checkform()}
                name="ps_no" value={formData.ps_no || ""} 
                onChange={handleChange} />
                <Form.Control.Feedback type="invalid">
                  User already exists
                </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              First Name
            </Form.Label>
            <Col sm={5}>
              <Form.Control type=" First Name" placeholder="First Name" value={formData.Firstname || ""} name="Firstname" onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Last Name
            </Form.Label>
            <Col sm={5}>
              <Form.Control type=" Last Name" placeholder="Last Name " value={formData.Lastname || ""} name="Lastname" onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Female"
                name="Gender"
                id="formHorizontalRadios1"
                value="Female"
                checked={formData.Gender === "Female"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Male"
                name="Gender"
                id="formHorizontalRadios2"
                value="Male"
                checked={formData.Gender === "Male" }
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Role
            </Form.Label>
            <Col sm={5}>
              <Form.Control type=" Role" placeholder=" Role" value={formData.Designation || ""} name="Designation"  onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Mobile No
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="Mobile NO" placeholder="Mobile" value={formData.Contact || ""} name="Contact" onChange={handleChange} />
            </Col>
          </Form.Group>     

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              LTIM Mail
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="Address" placeholder="Enter Mail" value={formData.LTIM_MailID || ""} name="LTIM_MailID" onChange={handleChange}/>
            </Col>
          </Form.Group>
          </div>  
  );
}
export default FormData;

