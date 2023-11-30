import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "react-bootstrap/Button";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import "../css/dashboard.css";
import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { responsiveFontSizes, styled } from "@mui/material/styles";
import App1 from "../../App1";
//table
import { useEffect, useState } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ForumIcon from "@mui/icons-material/Forum";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../bot/config";
import MessageParser from "../bot/MessageParser";
import ActionProvider from "../bot/ActionProvider";
import "../css/chatbot.css";
import { DataGrid } from "@mui/x-data-grid";
import ProgressBar from "react-bootstrap/ProgressBar";
import LinearProgress from "@mui/material/LinearProgress";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PureComponent } from "react";
import { AreaChart, Area } from "recharts";

const dataaa = [
  {name: "Jan",uv: 4000,pv: 2400,amt: 2400,},
  {name: "Feb",uv: 3000,pv: 1398,amt: 2210,},
  {name: "Mar",uv: 2000,pv: 9800,amt: 2290,},
  {name: "Apr",uv: 2780,pv: 3908,amt: 2000,},
  {name: "May",uv: 1890,pv: 4800,amt: 2181,},
  {name: "June",uv: 2390,pv: 3800,amt: 2500,},
  {name: "July",uv: 3490,pv: 4300,amt: 2100,},
  {name: "Aug",uv: 2340,pv: 1290,amt: 2100,},
  {name: "Sep",uv: 3300,pv: 1300,amt: 2100,},
  {name: "Oct",uv: 1200,pv: 2400,amt: 2100,},
  {name: "Nov",uv: 3000,pv: 4300,amt: 2100,},
  {name: "Dec",uv: 1000,pv: 1300,amt: 1100,},
];
function checkColor(val){
  if(val === 100 ) {
    return 'success';
  } else if (val < 20) {
    return 'warning';
  } else if (val < 100) {
    return 'info'; 
   }
}
const columns = [
  { field: "project", headerName: "Project Name", width: 130},
  { field: "lead", headerName: "Project Lead", width: 130 },
  {
    field: "progress",
    headerName: "Progress",
    width: 200,
    renderCell: (params) => (
      <Box sx={{ width: "100%", height: "30%", display: "flex" }}>
        <div style={{ width: "100%", paddingRight: "10%" }}>
          <LinearProgress
            style={{}}
            variant= "determinate"
            value={params.value}
            color={checkColor(params.value)}
          />
        </div>
        <div style={{ width: "100%", marginBottom: "5px" }}>{params.value}%</div>
      </Box>
    ),
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    
    renderCell: (params) => (
      <Button variant={checkColor(params.row.progress)} size="sm">
        {(params.row.progress) === 100 ? 'Completed' : 'In Progress'}
      </Button>
    ),
  },
  {
    field: "date",
    headerName: "Due Date",
    type: "number",
    width: 100,
  },
];

const rows = [
  {id: 1,project: 1,lead: "TEST",assignee: "TEST USER",progress: 50,date: "06 Sep 2021",},
  {id: 2,project: 2,lead: "TEST",assignee: "TEST USER",progress: 20,date: "02 Dec 2020",},
  {id: 3,project: 3,lead: "TEST",assignee: "TEST USER",progress: 60,date: "08 Nov 2019",},
  {id: 4,project: 4,lead: "TEST",assignee: "TEST USER",progress: 30,date: "20 Oct 2021",},
  {id: 5,project: 5,lead: "TEST",assignee: "TEST USER",progress: 100,date: "01 Feb 2022",},
  {id: 6,project: 6,lead: "TEST",assignee: "TEST USER",progress: 100,date: "09 Mar 2021",},
  {id: 7,project: 7,lead: "TEST",assignee: "TEST USER",progress: 60,date: "08 Feb 2020",},
  {id: 8,project: 8,lead: "TEST",assignee: "TEST USER",progress: 10,date: "10 Mar 2020",},
  {id: 9,project: 9,lead: "TEST",assignee: "TEST USER",progress: 90,date: "22 Apr 2022",},
];
const dataa = [
  {name: "Page A",uv: 4000,pv: 2400,amt: 2400,},
  {name: "Page B",uv: 3000,pv: 1398,amt: 2210,},
  {name: "Page C",uv: 2000,pv: 9800,amt: 2290,},
  {name: "Page D",uv: 2780,pv: 3908,amt: 2000,},
  {name: "Page E",uv: 1890,pv: 4800,amt: 2181,},
  {name: "Page F",uv: 2390,pv: 3800,amt: 2500,},
  {name: "Page G",uv: 3490,pv: 4300,amt: 2100,},
  {name: "Page G",uv: 3490,pv: 4300,amt: 2100,},
];

const data = [
  { project: 0, value: 10, label: "series A" },
  { project: 1, value: 15, label: "series B" },
  { project: 2, value: 20, label: "series C" },
];

const Dashboard = () => {
  //
  const [isShown, setIsShown] = useState(false);
  const handlebot = (event) => {
    setIsShown((current) => !current);
  };
  
  return (
    <div className="dashboard">
      <App1 />
      <div className="grid-containerr">
        <div className="grid-itemm">
          <div style={{ height: 370, width: "100%", backgroundColor: "white" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
      <div className="grid-containerr1">
        <div className="grid-container1">
          <div className="grid-item1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar style={{ width: "100%" ,height:"100%"}} />
            </LocalizationProvider>
          </div>
        </div>
        <div className="grid-container2">
          <div className="grid-item2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={dataaa}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bot">
        <button className="botpopup" onClick={handlebot}>
          <ForumIcon />
        </button>
      </div>
      <div style={{ display: isShown ? "block" : "none" }}>
        {isShown && (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
