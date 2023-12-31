import { Button } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import '../css/adddevice.css';
import * as React from "react";
import { axiosEvent } from "../utils/axiosEvent";
import { devdb } from "../../context";

export default function Formdata() {
  const val = useContext(devdb)
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
  const assetNoList = val.assetdb.map(row => row.assetNo)
  console.log(assetNoList.includes(Number(formData.assetNo)))
  const handleSubmit = async (event) => { 
    event.preventDefault();
    try {
      await axiosEvent.post("devices/",formData)
        .then(response => {
          if (response.status === 201){
          val.assetdb = ''
          }
          console.log('response is ', response)
          }
        );
    }catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
    const back = () => {
      navigate("/devicemanagement");
    };

  return (
    <div class="formdevice">
      <fieldset>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Asset No
            </Form.Label>
            <Col sm={5}>
              <Form.Control isInvalid={assetNoList.includes(Number(formData.assetNo))} type=" AssetNo" placeholder=" Asset No"  name="assetNo" onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                  Asset already exists
            </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Asset Type
            </Form.Label>
            <Col sm={5}>
              <Form.Control type=" Asset_Type" placeholder=" Asset Type" name="assetType" onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Asset Brand
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="  Asset_Brand" placeholder="  Asset Brand" name="assetBrand" onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Asset Model
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="  Asset_Model" placeholder="Asset Model" name="assetModel" onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Year
            </Form.Label>
            <Col sm={5}>
              <Form.Control type=" Year" placeholder=" Year" name="assetYear" onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              OS Version
            </Form.Label>
            <Col sm={5}>
              <Form.Control type="OS_Version" placeholder="OS Version" name="assetOsVersion" onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Asset Serial No
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="Asset Serial No"
                placeholder="Asset Serial Number"
                name="assetSerialNumber" onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Asset Location
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="Asset_Location"
                placeholder="Asset Location"
                name="assetLocation" onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Auto Update
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="Auto Update"
                placeholder="Auto Update"
                name="assetUpdate" onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Asset Ownership
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="Asset Ownership"
                placeholder="Asset Ownership"
                name="assetOwnership" onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <br />

          <Form.Group as={Row} className="mb-3">
            <Col xs={2}>
              <Button variant="contained" type="button" onClick={back}>
                Go Back
              </Button>
            </Col>
            <Col xs={2}>
              <Button variant="contained" 
                sx={{backgroundColor:'blue' }}
                type="submit" disabled={!((Object.values(formData).every(Boolean)) &&  Object.values(formData).length >= 10)}>
                Add Device
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </fieldset>
    </div>
  );
}
