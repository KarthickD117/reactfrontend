import { Outlet, Navigate } from 'react-router-dom'
import { useState } from "react";
import Topbar from '../global/topBar';
import Sidebar from "../global/sideBar";
import { getSessionStorage } from './sessionStorage';

const PrivateRoutes = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    const isUser = getSessionStorage('isUser')
    console.log('in private routing',typeof isUser)

    return(
        isUser === 'true' ? <><Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} /><Outlet/> </main></>: <Navigate to="/login"/>
    )
}

export default PrivateRoutes