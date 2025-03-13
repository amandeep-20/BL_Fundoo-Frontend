import React from 'react';
import '../DashboardContainer/DashboardContainer.scss';
import { Lightbulb, FolderDown, Trash2, Bell } from "lucide-react";
import './Sidebar.scss';
import { NavLink } from 'react-router-dom';  // Removed useLocation import

const sidebarItemsList = [
  { name: "Notes", icon: Lightbulb, path: '/dashboard/notes' },
  { name: "Archive", icon: FolderDown, path: '/dashboard/archive' },
  { name: "Reminders", icon: Bell, path: '/dashboard/reminders' },
  { name: "Trash", icon: Trash2, path: '/dashboard/trash' },
];

const Sidebar = ({ isCollapsed, onPageChange }) => {
  const handleNavClick = (itemName) => {
    onPageChange(itemName);
  };

  return (
    <div className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {sidebarItemsList.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <NavLink
            to={item.path}
            key={index}
            onClick={() => handleNavClick(item.name)}
            className={({ isActive }) => (isActive ? "notes" : "")}
            style={{ textDecoration: 'none', color: '#5F6368', width: '100%' }}
          >
            <div className="sidebar-column">
              <IconComponent className="sidebar-icon" />
              {!isCollapsed && <p className="sidebar-text">{item.name}</p>}
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;