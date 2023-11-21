import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import React from "react";
import '../css/adduser.css'

const FormData = ({ formData,handleChange}) => {
  return (
    <div>
     <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
      <Form.Label column sm={2}>
              Employee ID
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="Employee ID" placeholder="Employee ID" name="ps_no" value={formData.ps_no || ""} onChange={handleChange} />
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

