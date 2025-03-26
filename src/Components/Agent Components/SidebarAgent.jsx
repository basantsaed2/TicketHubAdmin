import React from "react";
import { FaTimes } from "react-icons/fa";
import Logo from "../../Assets/Images/Logo.png";
import MenuSideAgent from "./MenuSideAgent";

const SidebarAgent = ({ isSidebarCollapsed, onToggleSidebar, isSidebarVisible ,  onLinkClick}) => {
  return (
    <aside
      className={`fixed z-50 lg:relative custom-scrollbar overflow-y-auto top-0 left-0 h-screen bg-mainColor text-white transition-all duration-300 
      ${isSidebarCollapsed ? "lg:w-20" : "lg:w-64"} w-64 ${isSidebarVisible ? "block" : "hidden"}`}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center justify-between ${isSidebarCollapsed ? "px-2" : "px-4"} py-2 border-b border-white`}>
        <div className="flex items-center space-x-2">
          {isSidebarVisible && (
            <span className="text-2xl font-semibold block lg:hidden">Ticket Hub</span>
          )}
          {!isSidebarCollapsed && (
            <span className="text-2xl font-semibold hidden lg:block ">Ticket Hub</span>
          )}
          <div className="w-14 h-14 rounded-full flex items-center justify-center">
            <img src={Logo} className='rounded-full w-full h-full' alt="Main Icon" />
          </div>
        </div>
        {/* Close Sidebar Button */}
        <button className="lg:hidden text-white text-2xl" onClick={onToggleSidebar}>
          <FaTimes />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="p-4">
        <MenuSideAgent onLinkClick={onLinkClick} // Pass the link click handler here
        isSidebarCollapsed={isSidebarCollapsed} />
      </div>
    </aside>
  );
};

export default SidebarAgent;
