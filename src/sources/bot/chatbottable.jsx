import React, { useEffect, useState } from "react";
export default function ChatTable({array, row}){
    const [re,setre] = useState([])
    useEffect(() =>{
        const splitdata = row[0].split('/')
        if(splitdata.length == 1){
            setre(array.filter(row => row.assetType == splitdata[0]))
        }
        else{
            setre(array.filter(row => row.assetType == splitdata[1] && row.assetBrand == splitdata[0]))
        }
    },[])
    return (
        <div className="table-container">
                <div className="test">
              <p>
                With the available devices approximately {re.length * 20} test cases shall be
                achieved! &nbsp;
                <i>Note: It is based on system prediction. The actual count may vary based on the network.</i>
              </p>
            </div>
            <table className="table" style={{borderCollapse: "collapse", border:'1px solid black'}}>
              <thead style={{textAlign:"left"}}>
                <tr>
                  <th>Asset Model</th>
                  <th>OS Version</th>
                </tr>
              </thead>
              <tbody>
                {re.map(row => (
                <tr>              
                <td>{row.assetModel}</td>
                <td>{row.assetOsVersion}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
    )
}