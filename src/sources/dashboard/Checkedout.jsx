import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { axiosEvent } from "../utils/axiosEvent";
import detailsRows from "../components/rowMaping";
import StickyTable from "../components/table";
import '../css/checkedout.css'
import useAxios from "../utils/hooks/useaxios";

const columns = [
  { id: "assetNo", label: "Asset No", width: 150 },
  { id: "assetType", label: "Asset Type", width: 150 },
  { id: "assetBrand", label: "Asset Brand", width: 150 },
  { id: "assetOsVersion", label: "OS Version", width: 150 },
  { id: "assetSerialNumber", label: "Asset Serial No", width: 150 },
  { id: "Firstname", label: "Borrower Name", width: 150 },
  { id: "dateBorrowed", label: "Date Borrowed", width: 150 },
];

export default function CheckedOut() {
  const [resultArray, setResultArray] = useState([]);
  const {data, error, loading} = useAxios('devicereport/view/')
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axiosEvent.get("devicereport/view/")
  //       .then((response) => setResultArray(response.data))
  //       .catch((err) => console.log(err));
  //   };
  //   fetchData();
  // }, []);
  const details = detailsRows(data)
  return (
    <div className="checkout-container">
      <div className="checkedout-table-container">
        <StickyTable columns={columns} data={details}/>
      </div>
    </div>
  );
}
