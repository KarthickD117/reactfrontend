import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
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
import { axiosEvent } from "../utils/axiosEvent";
//table

import { useEffect, useState } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../bot/config";
import MessageParser from "../bot/MessageParser";
import ActionProvider from "../bot/ActionProvider";
import '../css/chatbot.css';


const dataa = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data = [
  { id: 0, value: 43, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
  { id: 3, value: 15, label: "series D" }
];

const Dashboard = () => {
  const [isShown, setIsShown] = useState(false);
  const handlebot = (event) => {
    setIsShown((current) => !current);
  };
  const [resultArray, setResultArray] = useState([]);

  const fetchData = async () => {
    await axiosEvent
      .get("devices/")
      .then((response) => setResultArray(response.data))
      .catch((err) => console.log(err));
  };
  
  useEffect(() => { 
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div class="grid-container">
        <div class="grid-item">
          <div className="boxinfo">
            <div className="title">
              <span style={{ color: "black" }}>Total Builds</span>
            </div>
          </div>
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={dataa}>
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div class="grid-item">
          
          <PieChart
            series={[
              {
                data,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30 },
              },
            ]}
            sx={{
              [`& .${pieArcClasses.faded}`]: {
                fill: "Black",
              },
            }}
            height={150}
            width={200}
          />
        </div>
        <div class="grid-item">
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={dataa}>
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div class="grid-item">
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={250}
            height={160}
          />
        </div>
      </div>
      <div class="grid-containerr">
        <div class="grid-itemm">
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
      </div>
    </div>
  );
};

export default Dashboard;
