import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function Roaster() {
  const reader = new FileReader()
  const [rest, setRest] = useState([])
  const [currentTime, setCurrentTime] = useState()
  const changeHandler = (e) => {
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
    };
    reader.readAsText(e.target.files[0])
  }
  useEffect(() =>{
    const time = new Date()
    console.log(time.getHours())
  })
  return (
    <>
    <div style={{justifyContent:'flex-end'}}>
      <Button
      sx={{height:'20px', width:'50px'}}
      variant="outlined"
      name="filehandler"
      onChange={changeHandler}
      component='label'
      accept='.csv'
      >
      <input
      type="file"
      accept=".csv"
      hidden={true}
      />
      import
      </Button>
    </div>
    <div className="grid-container">
    <div className="grid-item" style={{height:'100%'}}>
      <div className="text">
        <h6>SHIFT 1</h6>
      </div>
      <ListGroup>
        <ListGroup.Item variant="primary">
          <CheckCircleIcon color="success" />
          Employee 1
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <CheckCircleIcon color="success" />
          Employee 2
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <CheckCircleIcon color="success" />
          Employee 3
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <CheckCircleIcon color="success" />
          Employee 4
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <CheckCircleIcon color="success" />
          Employee 5
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <CheckCircleIcon color="success" />
          Employee 6
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <CheckCircleIcon color="success" />
          Employee 7
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <CheckCircleIcon color="success" />
          Employee 8
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <CheckCircleIcon color="success" />
          Employee 9
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <CheckCircleIcon color="success" />
          Employee 10
        </ListGroup.Item>
      </ListGroup>
    </div>
    <div class="grid-item" style={{height:'100%'}}>
      <div className="text">
        <h6>SHIFT 2</h6>
      </div>
      <div className="employees">
        <ListGroup>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 11
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 12
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Emploee 13
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 14
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 15
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 16
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 17
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 18
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 19
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 20
          </ListGroup.Item>
        </ListGroup>{" "}
      </div>
    </div>
    <div class="grid-item" style={{height:'100%'}}>
      <div className="text">
        <h6>SHIFT 3</h6>
      </div>
      <div className="employees">
        <ListGroup>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 21
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 22
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 23
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 24
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 25
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 26
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 27
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 28
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 29
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 30
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
    <div class="grid-item" style={{height:'100%'}}>
      <div className="text">
        <h6>GENERAL</h6>
      </div>
      <div className="employees">
        <ListGroup>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 31
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 32
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 33
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 34
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 35
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 36
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 37
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 38
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 39
          </ListGroup.Item>
          <ListGroup.Item>
            <CheckCircleIcon color="success" />
            Employee 40
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  </div>
  </>
  );
}
