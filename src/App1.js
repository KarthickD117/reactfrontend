import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import Carousel from 'react-material-ui-carousel'
import { Box } from "@mui/material";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { CenterFocusStrong } from "@mui/icons-material";





const Gc = () => {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];
    return (
      <div
        className={"insidegc"}
        style={{ height: "300px", display: "flex", overflow: "hidden" }}
      >

          <LineChart
            series={[
              { data: pData, label: "pv" },
              { data: uData, label: "uv" },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
      </div>
    );
}
const Gc2 = () => {
    const data = [
        { project: 0, value: 10, label: "series A" },
        { project: 1, value: 15, label: "series B" },
        { project: 2, value: 20, label: "series C" },
        { project: 3, value: 20, label: "series D" },
        { project: 4, value: 20, label: "series E" },
      ];
    return (
        <div className={'insidegc2'} style={{ height:'300px'}}>
            <PieChart
            margin={{ top: 50, bottom: 50, left: 50, right:50 }}
            series={[
              { data,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: '30', additionalRadius: -30 },
              },
            ]}
            slotProps={{
                legend:{
                    direction:"row", position:{vertical:'bottom', horizontal:'bottom'},
                    padding:'0px',
                }
            }}
            sx={{
              [`& .${pieArcClasses.faded}`]: {
                fill: "Black",
              },
            }}

            
          />
        </div>
    )
  }
const Gc3 = () => {
    const data = [
      { value: 5, label: "A" },
      { value: 10, label: "B" },
      { value: 15, label: "C" },
      { value: 20, label: "D" },
    ];

    const StyledText = styled("text")(({ theme }) => ({
      fill: theme.palette.text.primary,
      textAnchor: "middle",
      dominantBaseline: "central",
      fontSize: 20,
    }));

    function PieCenterLabel({ children }) {
      const { width, height, left, top } = useDrawingArea();
      return (
        <StyledText x={left + width / 2} y={top + height / 2}>
          {children}
        </StyledText>
      );
    }
      
    return (
      <div className={"insidegc2"} style={{ height: "300px" }}>
        <PieChart
          series={[{ data, innerRadius: 80 }]}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "bottom" },
              padding: "0px",
            },
          }}
          margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
        >
          <PieCenterLabel>Add Text</PieCenterLabel>
        </PieChart>
      </div>
    );
}

const Gc4 = () => {
    return (
        <div className={'insidegc2'} style={{ height:'300px'}}>
       <BarChart
            
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={400}
            height={300}
          />
        </div>
    )
}



function App1() {
  
  return (
    <div style={{display:"flex"}}>
      <div style={{flex:0.6}}></div>
      <div style={{flex:1}}>
    <Carousel>
        <Gc/>
        <Gc2/>
        <Gc3/>
        <Gc4/>
    </Carousel>
    </div>
    <div style={{flex:0.8}}></div>
    </div>
  )
}
export default App1;


