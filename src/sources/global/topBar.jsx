import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useContext } from "react";
import * as React from 'react';
import { ColorModeContext,tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ProfileMenu from "./profile";
import { useSearchCtx } from "../utils/customcontext";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [formData, setFormData] = useSearchCtx();
    const handleChange = (event) => {
      setFormData(event.target.value)
  }
    return ( 
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" name="filter" onChange={handleChange} value={formData ? formData : ""}/>
        <IconButton type="submit" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
    {/* ICONS */}
    <Box display="flex">
      <IconButton onClick={colorMode.toggleColorMode} disabled>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
        </IconButton>
        <ProfileMenu />
    </Box>
  </Box>
);
}

export default Topbar;
