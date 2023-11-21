import React, {useContext} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Col from "react-bootstrap/Col";
import { tokens } from "../../theme";

export default function ViewEmployee() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()
  const back = () => {
    navigate("/userprofile");
  };
  const columns = [
    { field: "ps_no", headerName: "PS NO", width: 80 },
    { field: "Firstname", headerName: "Firstname", width: 125 },
    { field: "Lastname", headerName: "Lastname", width: 125 },
    { field: "Gender", headerName: "Gender", width:70},
    { field: "Designation", headerName: "Designation", width: 150,  minWidth: 150, maxWidth: 200 },
    { field: "Contact", headerName: "Contact", width: 100, resizable: false },
    { field: "LTIM_MailID", headerName: "LTIM Mail ID", width: 250 },
  ]
    const emp = useLocation();
    const empData = [Object.fromEntries(emp.state)]

  return (
    <div className="devicetable">
      <div style={{ height: 200, width: 1000, padding: 25 }}>
        <DataGrid rowHeight={40}
          rows={empData}
          columns={columns}
          getRowId={(rows) => rows.ps_no}
          pageSizeOptions={[1]}
        />
      </div>
      <Button
          sx={{ top: 10,left: 25, width: "100px" }}
          variant="contained"
          color="primary"
          onClick={back}
        >
          Back
        </Button>
    </div>
  );
}
