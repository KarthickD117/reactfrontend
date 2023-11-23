import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import { axiosEvent } from "../utils/axiosEvent";


export default function UserDataTable() {
  const columns = [
    { field: "Firstname", headerName: "Name", width: 200 },
    { field: "ps_no", headerName: "Employee ID", width: 200 },
    { field: "Designation", headerName: "Role", width: 220,flex:1},
    { field: "Action", headerName: "Action", width: 180,  transition:'none' , renderCell: (params) => <Box>
    <IconButton onClick={() => handleViewData(params.row)}>
      <SearchIcon />
    </IconButton>
    <IconButton disabled={!perm} onClick={() => handleEditData(params.row)}>
      <ModeEditIcon />
    </IconButton>
    <IconButton disabled={!perm} onClick={() => console.log(`click on delete id is ${params.row.ps_no}`)}>
      <DeleteOutlinedIcon />
    </IconButton>
    </Box>
    }
  ];
  
  //
  const navigate = useNavigate();
  const navigatee = () => {
    navigate("/adduser");
  };
  const handleViewData = (data) => {
    navigate('/viewemployee',{ state: Object.entries(data)});
  }
  const handleEditData = (data) => {
    navigate('/updateemployee',{ state: Object.entries(data)});
  }
  const [resultArray, setResultArray] = useState([]);
  const [perm, setPerm] = useState(false)

  useEffect(() => {
    const expensesListResp = async () => {
      await axiosEvent.get("employees/")
        .then((response) => {
          setResultArray(response.data.data)
          setPerm(response.data.perm)
        })
        .catch((err) => console.log(err));
    };
    expensesListResp();
  }, []);

  return (
    
    <div class="devicetable">
      <div class="button" style={{ paddingLeft: 25 }}>
        {perm && <Button variant="outline-primary" disabled={!perm} onClick={navigatee}>
          Add User
        </Button>}
      </div>

        <div style={{ height: '85%', width: '100%', padding: 25, transition:'none ! important'}}>
        <DataGrid
          style={{width:'93%'}}
          rows={resultArray}
          columns={columns}
          localeText={{noRowsLabel: 'User is not authenticated'}}
          getRowId={(rows) => rows.ps_no}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}
