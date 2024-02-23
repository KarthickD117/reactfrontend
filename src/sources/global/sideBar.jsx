import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DevicesIcon from '@mui/icons-material/Devices';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import TaskIcon from '@mui/icons-material/Task';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReplayIcon from "@mui/icons-material/Replay";
import { useLocation } from 'react-router-dom';
import { getSessionStorage } from "../utils/sessionStorage";
import { useSearchCtx } from "../utils/customcontext";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Item = ({ title, to, icon, selected, setSelected, collapsed }) => {
  const theme = useTheme();
  const [filterData, setFilterData] = useSearchCtx()
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title)
        setFilterData('')
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};


const Sidebar = () => {
  const location = useLocation()
  const renderSwitch = (val) => {
    switch(val) {
      case '/': return 'Dashboard';
      case '/userprofile': return 'User Profile';
      case '/devicemanagement': return "Device Management";
      case '/roasterplan': return 'Roaster';
      case '/allocate': return 'Allocate';
      case '/checkin': return 'Check In';
      case '/checkout': return 'Check Out';
      case '/checkedout': return 'Checked-out Devices';
      case '/reports': return 'Report';
      case '/tasks': return 'Tasks';
      case '/calendar': return 'Calendar'
    }
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(renderSwitch(location.pathname));
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "white",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} width={'290px'}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="20px">
              <Box display="flex" justifyContent="center" alignItems="center">
                
              </Box>
              <Box textAlign="center">
              
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                </Typography>
                <Typography variant="h5" color={colors.primary[100]}>Welcome {getSessionStorage('firstname')}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "8%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<SpaceDashboardIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="User Profile"
              to="/userprofile"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Device Management"
              to="/devicemanagement"
              icon={<DevicesIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Roaster"
              to="/roasterplan"
              icon={<TrackChangesIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Check Out"
              to="/allocate"
              icon={<ShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />

            <Item
              title="Check In"
              to="/checkin"
              icon={<ReplayIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />

            <Item
              title="Report"
              to="/reports"
              icon={<SummarizeIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Checked-out Devices"
              to="/checkedout"
              icon={<DevicesIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Release Calendar"
              to="/calendar"
              icon={<CalendarMonthIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Tasks"
              to="/tasks"
              icon={<TaskIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
