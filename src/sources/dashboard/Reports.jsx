import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { axiosEvent } from "../utils/axiosEvent";
import detailsRows from "../components/rowMaping";
import { Routes, Route, useNavigate } from "react-router-dom";
import StickyTable from "../components/table";

const columns = [
  { id: "assetNo", label: "Asset No", width: 85 },
  { id: "assetType", label: "Asset Type", width: 85 },
  { id: "assetBrand", label: "Asset Brand", width: 85 },
  { id: "assetModel", label: "Asset Model", width: 85 },
  {
    id: "assetSerialNumber",
    label: "Asset Serial No",
    width: 85,
  },
  { id: "Firstname", label: "Borrower Name", width: 85 },
  { id: "dateBorrowed", label: "Date Borrowed", width: 100 },
  { id: "dateReturned", label: "Return Date", width: 100 },
  { id: "duration", label: "Duration", width: 85 },
];

export default function Report() {

  const [resultArray, setResultArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axiosEvent.get("devicereport/view/")
        .then((response) => setResultArray(response.data))
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  const details = detailsRows(resultArray)
  return (
    <StickyTable columns={columns} data={details} />
  );
}
