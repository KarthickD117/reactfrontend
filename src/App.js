import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ViewEmployee from "./sources/dashboard/viewEmployee";
import UpdateEmployee from "./sources/dashboard/UpdateEmployee";
import Dashboard from "./sources/dashboard/dashboard";
import DataTable from "./sources/dashboard/Devicemanagement";
import UserDataTable from "./sources/dashboard/Userprofile";
import Formdata from "./sources/dashboard/adddevice";
import UserData from "./sources/dashboard/adduser";
import Contacts from "./sources/dashboard/Deviceprocurement";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Report from "./sources/dashboard/Reports"
import "bootstrap/dist/css/bootstrap.min.css";
import Allocate from "./sources/dashboard/Allocate";
import Checkout from "./sources/dashboard/Checkout";
import CheckIn from "./sources/dashboard/Checkin";
import CheckedIn from "./sources/dashboard/Checkedin";
import CheckedOut from "./sources/dashboard/Checkedout";
import Roaster from "./sources/dashboard/Roasterplan";
import Login from "./sources/global/log";
import PrivateRoutes from "./sources/utils/privateRoute";
import PublicRoutes from "./sources/utils/publicRoute";
import RequestDevice from "./sources/dashboard/requestDevice";
import { setSessionStorage, getSessionStorage} from "./sources/utils/sessionStorage";
import PageConstruct from "./sources/components/constructionImage";
import Tasks from "./sources/dashboard/Tasks";
import TaskView from "./sources/dashboard/detailedTask";

function App() {
  const [theme, colorMode] = useMode();
  useEffect(() => {
    if(typeof Storage !== 'undefined'){
      if (getSessionStorage('isUser')=== null){
      setSessionStorage('isUser', false)
    }
  }
  }, []);
  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>  
        <CssBaseline />   
            <div className="app">
            <Routes>
              <Route element={<PrivateRoutes />}>
              <Route path="*" element={<PageConstruct />}/>
              <Route path="/" element={<Dashboard />} />
              <Route path="/devicemanagement" element={<DataTable />} />
              <Route path="/deviceprocurement" element={<Contacts />} />
              <Route path="/adddevice" element={<Formdata />} />
              <Route path="/userprofile" element={<UserDataTable />} />
              <Route path="/adduser" element={<UserData />} />
              <Route path="/viewemployee" element={<ViewEmployee />} />
              <Route path="/updateemployee" element={<UpdateEmployee />} />  
              <Route path="/reports" element={<Report />} />
              <Route path="/roasterplan" element={<Roaster />} />
              <Route path="/allocate" element={<RequestDevice />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasksview" element={<TaskView />} />
              <Route path="/checkin" element={<CheckIn />} />
              <Route path="/checkedin" element={<CheckedIn />} />
              <Route path="/checkedout" element={<CheckedOut />} />
              </Route>
              <Route path="/login" element={<Login />} />
              </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>  
  );
}

export default App;


