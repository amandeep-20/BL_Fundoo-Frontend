import React, { useState, useContext } from "react";
import "./Navbar.scss";
import { Menu, RotateCw, Settings, Rows2, Grip, Grid, Search, Loader2 } from "lucide-react";
import { Avatar, Tooltip } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import { NotesContext } from "../../context/NotesContext";
import { getNotes } from "../../utils/Api"; 

function Navbar({ toggleSidebar, activePage, onViewChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const { setNotesList, setSearchQuery } = useContext(NotesContext); 
  const firstLetter = localStorage.getItem("email")?.charAt(0).toLocaleUpperCase() || "U";
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewToggle = () => {
    setIsGridView(!isGridView);
    onViewChange(!isGridView);
  };

  const handleRefresh = () => {
    setIsLoading(true); 
    getNotes()
      .then((data) => {
        const allNotes = data?.data?.data?.data || [];
        setNotesList(allNotes); 
      })
      .catch((error) => {
        setNotesList([]); 
      })
      .finally(() => {
        setIsLoading(false); 
      });
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
              {isLoading ? (
                <Loader2 className="icons loading-icon" />
              ) : (
                <RotateCw className="icons" onClick={handleRefresh} />
              )}
            </Tooltip>
            <div className="icon-div row-icon tooltip-wrapper">
              <Tooltip title={isGridView ? "List view" : "Grid view"}>
                {isGridView ? (
                  <Rows2 className="icons" onClick={handleViewToggle} />
                ) : (
                  <Grid className="icons" onClick={handleViewToggle} />
                )}
              </Tooltip>
            </div>
            <Tooltip title="Settings">
              <Settings className="icons" />
            </Tooltip>
          </div>
          <div className="header-right-container-account">
            <Tooltip title="Google apps">
              <Grip className="icons" />
            </Tooltip>
            <div className="icon-div-account" onClick={handleProfileClick}>
              <Tooltip title="Profile">
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