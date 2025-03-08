import React, { useState, useContext } from "react";
import "./Navbar.scss";
import { Menu, RotateCw, Settings, Rows2, Grip, Search } from "lucide-react";
import { Avatar, Tooltip } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import { NotesContext } from "../../context/NotesContext";

function Navbar({ toggleSidebar, activePage }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setSearchQuery } = useContext(NotesContext);
  const firstLetter = localStorage.getItem("email")?.charAt(0).toLocaleUpperCase() || "U";

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="dashboard-header">
      <div className="header-left">
        <div className="dashboard-header-left-container">
          <div className="header-left-container-menu">
            <Tooltip title="Main Menu">
            <Menu className="icons" onClick={toggleSidebar} />
            </Tooltip>
          </div>
          <div className="header-left-container-logo">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
              alt="Google Keep logo"
            />
          </div>
          <div className="header-left-container-title">{activePage}</div>
        </div>
      </div>
      <div className="header-right">
        <div className="dashboard-header-middle-container">
          <div className="header-middle-search-icon">
            <Search className="search-icon" />
          </div>
          <input
            className="header-middle-search-input"
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
        </div>
        <div className="dashboard-header-right-container">
          <div className="header-right-container-icons">
              <Tooltip title="Refresh">
              <RotateCw className="icons" />
              </Tooltip>
            <div className="icon-div row-icon tooltip-wrapper">
            <Tooltip title="List view">
              <Rows2 className="icons" />
              </Tooltip>
            </div>
            <Tooltip title="settings">
              <Settings className="icons" />
            </Tooltip>
          </div>
          <div className="header-right-container-account">
          <Tooltip title="Goggle apps">
              <Grip className="icons" />
            </Tooltip>
            <div className="icon-div-account" onClick={handleProfileClick}>
              <Tooltip title="profile">
              <Avatar sx={{ bgcolor: "#8a6aff", width: 40, height: 40, fontSize: 20 }}>
                {firstLetter}
              </Avatar>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <ProfileMenu anchorEl={anchorEl} handleClose={handleClose} />
    </div>
  );
}

export default Navbar;