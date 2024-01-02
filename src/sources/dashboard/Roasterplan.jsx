import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Papa from 'papaparse'
import { axiosEvent } from "../utils/axiosEvent";
export default function Roaster() {
  const reader = new FileReader()
  const [rest, setRest] = useState({RoasterMonth:'',RoasterPlan:''})
  const vall = {RoasterMonth:'', RoasterPlan:''}
  var name = ''
  const [currentTime, setCurrentTime] = useState()
  const arr = []
  const changeHandler = (e) => {
    name = e.target.files[0].name.replace('.csv','')
    console.log(e.target.files[0].name)
    console.log('hi')
        Papa.parse(e.target.files[0],{
        skipEmptyLines: true,
        complete : function (re) {
          console.log(re.data)
          setRest({RoasterMonth:JSON.stringify(name).replaceAll("\"",''), RoasterPlan:cvtToObject(re.data)})
          vall.RoasterMonth=name
        }
      })
    console.log(rest)
    e.target.value = "";
  }
  function cvtToObject(data){
    var ar = data.map(r => r[0].split(','))
    var fv = ar.shift()
    ar = ar.map(r=> r.map(ro => JSON.stringify(ro).replaceAll("\"",'')))
    fv = fv.map(r => JSON.stringify(r).replaceAll("\"",''))
    var obj ={}
    const val = []
    ar.map(r => {
        r.forEach((row,i) => {
          obj[fv[i]]=row
        })
        val.push((obj))
        obj ={}
      }
    )
    return val
  }

  const handleSubmit = async (event) => {
    const vaal = {"RoasterMonth": (rest.RoasterMonth), "RoasterPlan":JSON.stringify(rest.RoasterPlan)}
    event.preventDefault();
    try {
      await axiosEvent.post(
        "roaster/viewroaster/", vaal
      ).then(response => {
        console.log(response)
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick =(e) =>{ // for submiting data to backend
    handleSubmit(e)

  }
  useEffect(() =>{
    const time = new Date()
    console.log(time.getHours())
  })
  return (
    <>
    <div style={{height:'80px'}}>
      <Button
      sx={{height:'35px', width:'100px', top:'50%', left:'100%', transform:'translate(-110%, -50%)', backgroundColor:'blue',
      '&:hover': {
        backgroundColor: 'lightblue',
        color: '#3c52b2',
    },}}
      variant="contained"
      name="filehandler"
      startIcon={<CloudUploadIcon />}
      onChange={changeHandler}
      component='label'
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
    <div className="grid-item" style={{height:'100%'}}>
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
