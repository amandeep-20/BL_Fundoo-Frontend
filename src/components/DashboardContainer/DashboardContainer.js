import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./DashboardContainer.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { NotesProvider } from "../../context/NotesContext";

const DashboardContainer = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("Notes");
  const [isGridView, setIsGridView] = useState(true); // Added view state

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  const handleViewChange = (newView) => {
    setIsGridView(newView);
  };

  return (
    <NotesProvider>
      <div className="dashboard-main-body">
        <Navbar 
          toggleSidebar={toggleSidebar} 
          activePage={activePage}
          onViewChange={handleViewChange} // Added prop
        />
        <div className="dashboard-main-center">
          <Sidebar 
            isCollapsed={isCollapsed} 
            onPageChange={handlePageChange} 
          />
          <Outlet context={{ isGridView }} /> {/* Pass isGridView through Outlet */}
        </div>
      </div>
    </NotesProvider>
  );
};

export default DashboardContainer;