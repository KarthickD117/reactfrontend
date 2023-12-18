import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { axiosEvent } from "../utils/axiosEvent";
import detailsRows from "../components/rowMaping";

const columns = [
  { field: "assetNo", headerName: "Asset No", width: 150 },
  { field: "assetType", headerName: "Asset Type", width: 150 },
  { field: "assetBrand", headerName: "Asset Brand", width: 150 },
  { field: "assetYear", headerName: "Year", width: 150 },
  { field: "assetOsVersion", headerName: "OS Version", width: 150 },
  { field: "assetSerialNumber", headerName: "Asset Serial No", width: 150 },
 
];

export default function CheckedIn() {
  const [resultArray, setResultArray] = useState([]);
  useEffect(() => {
    const expensesListResp = async () => {
      await axiosEvent
        .get("devicereport/checkin/")
        .then((response) => setResultArray(response.data))
        .catch((err) => console.log(err));
    };
    expensesListResp();
  }, []);
  const details = detailsRows(resultArray)

  return (
    <div style={{ height: "87%", width: "100%", padding: 25 ,overflow:"auto"}}>
     
      <DataGrid
        rows={details}
        columns={columns}
        getRowId={(rows) => rows.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
    </div>
  );
}
