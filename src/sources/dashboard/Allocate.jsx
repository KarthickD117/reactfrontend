import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { axiosEvent } from "../utils/axiosEvent";
import Form from "react-bootstrap/Form";
import "../css/allocate.css";
import "../css/checkout.css";
import { useNavigate } from "react-router-dom";
import { empdb } from "../../context";

export default function Allocate(colors) {
  const val = useContext(empdb)
  const navigate = useNavigate();
  const [message, setMessage]= useState('')
  const [resultArray, setResultArray] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ps_no:'', Firstname:''});

  const checkout = () => {
    if (selectedUser.ps_no !== '') { navigate("/checkout", {state:Object.entries(selectedUser)})}
    else {
      setMessage('*Please select a valid option')
    }
  }

  const handleChange = (e) => {
    setMessage('')
    const selectedPsNo = Number(e.target.value)
    const selectedName = (selectedPsNo !== 0) ? resultArray.find((option) => option.ps_no === selectedPsNo).Firstname : ''
    setSelectedUser({ps_no : selectedPsNo, Firstname:selectedName});
  };

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
    if (val.userdb==='') { 
      fetchData();
      } 
    else {
      setResultArray(val.userdb)
    }
  }, []);
  
  return (
    <div className="main">
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
