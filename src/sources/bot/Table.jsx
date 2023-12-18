import React from "react";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { axiosEvent } from "../utils/axiosEvent";
const Table = (data) => {
  const camelToFlat=(camel)=>{
    const camelCase =camel.replace(/([a-z])([A-Z])/g, '$1 $2').split(" ")
    const arra = camelCase.map((row) => row.toUpperCase())
    return arra
  }
  const renderSwitch = (val) => {
    switch(val) {
      case 'CASTINGDEVICE': return 'CASTING DEVICE';
      case 'STREAM': return 'STREAMING DEVICE';
      default: return val;
    }
  }
  let dataa = camelToFlat(data.state.messages[data.state.messages.length-1].widget)
  dataa[1] = renderSwitch(dataa[1])
  const [resultArray, setResultArray] = useState([]);
  const fetchData = async () => {
    await axiosEvent
      .get("devices/")
      .then((response) => setResultArray(response.data.data))
      .catch((err) => console.log(err));
  };
  
  useEffect(() => { 
    fetchData();
  }, []);
  const filter = resultArray.filter((rows) => rows.assetType === dataa[1] && rows.assetAvailability === 'Available' && rows.assetBrand.includes(dataa[0]))
  return (
          <div className="table-container">
                <div className="test">
              <p>
                With the available devices approx 100 test cases can be
                achieved!
              </p>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Asset Model</th>
                  <th>OS Version</th>
                </tr>
              </thead>
              <tbody>
                {filter.map((row) => (
                <tr>              
                <td>{row.assetModel}</td>
                <td>{row.assetOsVersion}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
};

export default Table;
