import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useEffect, useContext, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import React from "react";
import '../css/adduser.css';
import { axiosEvent } from "../utils/axiosEvent";
import { empdb } from "../../context";

const FormData = ({ formData,handleChange}) => {
  const location = useLocation()
  const initialVal = useRef('')
  const val = useContext(empdb)
  const [resultArray, setResultArray] = useState([])
  const userlist = resultArray.map(row => row.ps_no)
  console.log(userlist)
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

  const fetchData = async () => {
    await axiosEvent.get("employees/")
      .then((response) => {
        setResultArray(response.data.data)
        val.userdb = response.data.data
        val.hasPerm = response.data.perm
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    initialVal.current = Number(formData.ps_no)
    if (val.userdb==='') { 
      fetchData();
      } 
    else {
      setResultArray(val.userdb)
    }
  },[])
  return (
    <div>
     <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
      <Form.Label column sm={2}>
              Employee ID
            </Form.Label>
            <Col sm={5}>
              <Form.Control  required type="number" 
                placeholder="Employee ID"
                isInvalid={checkform()}
                name="ps_no" value={formData.ps_no || ""} 
                onChange={handleChange} />
                <Form.Control.Feedback type="invalid" >
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
              <Form.Control required type="text" placeholder="First Name" isInvalid={formData.Firstname ===''} value={formData.Firstname || ""} name="Firstname" onChange={handleChange} />
              <Form.Control.Feedback type="invalid">
                Please fill out this field
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Last Name
            </Form.Label>
            <Col sm={5}>
              <Form.Control required type="text" placeholder="Last Name " isInvalid={formData.Lastname ===''} value={formData.Lastname || ""} name="Lastname" onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please fill out this field
              </Form.Control.Feedback>
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
              <Form.Control required isInvalid={formData.Designation ===''} type=" text" placeholder=" Role" value={formData.Designation || ""} name="Designation"  onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please fill out this field
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Mobile No
            </Form.Label>
            <Col sm={5}>
              <Form.Control required isInvalid={formData.Contact ===''} type="number" placeholder="Mobile" value={formData.Contact || ""} name="Contact" onChange={handleChange} />
              <Form.Control.Feedback type="invalid">
                Please fill out this field
              </Form.Control.Feedback>
            </Col>
          </Form.Group>     

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              LTIM Mail
            </Form.Label>
            <Col sm={5}>
              <Form.Control  required isInvalid={formData.LTIM_MailID ===''} type="text" placeholder="Enter Mail" value={formData.LTIM_MailID || ""} name="LTIM_MailID" onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please fill out this field
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          </div>  
  );
}
export default FormData;

