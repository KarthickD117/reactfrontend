import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { axiosEvent } from "../utils/axiosEvent";
import Form from "react-bootstrap/Form";
import "../css/allocate.css";
import "../css/checkout.css";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function Allocate() {

  const navigate = useNavigate();
  const [message, setMessage]= useState('')
  const checkout = () => {
    if (selectedUser.ps_no !== '') { navigate("/checkout", {state:Object.entries(selectedUser)})}
    else {
      setMessage('*Please select a valid option')
    }
  }
  const handleChange = (e) => {
    const selectedPsNo = Number(e.target.value)
    const selectedName = (selectedPsNo !== '') ? resultArray.find((option) => option.ps_no === selectedPsNo).Firstname : ''
    setSelectedUser({ps_no : selectedPsNo, Firstname:selectedName});
  };

  const [resultArray, setResultArray] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ps_no:'', Firstname:''});
  useEffect(() => {
    const expensesListResp = async () => {
      await axiosEvent.get("employees/")
        .then((response) => setResultArray(response.data.data))
        .catch((err) => console.log(err));
    };
    expensesListResp();
  }, []);
  
  return (
    <div className="main">
      <Container>
        <Row>
          <Col sm={10}></Col>
        <Col sm={2}><Button variant="secondary">Go Back</Button></Col>
        </Row>
      </Container>
      <div className="linehandle">
        <div class="line"></div>
      </div>
      <div className="maindiv">
        <Form.Select size='lg' onChange={handleChange}>
        <option value=''> Select Employee </option>
        {resultArray.map((empName) => <option value={empName.ps_no}>{empName.ps_no} - {empName.Firstname}</option>)}
        </Form.Select>
        <div style={{ color: 'red' }}>{message}</div>
        <br />
        <div className="center">
          <Button variant="outline-primary" onClick={checkout}>Submit</Button>
        </div>
        <br />
      </div>
    </div>
  );
}
