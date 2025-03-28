import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../Context/Auth";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi"; // Import the user icon

const Navbar = ({ onToggleSidebar }) => {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout(); // Call logout function from auth context
  };

  return (
    <nav className="bg-white shadow-md px-2 md:px-6 py-2 flex justify-between items-center">
      {/* Sidebar Toggle Button */}
      <button className="text-gray-600 text-2xl flex gap-3 items-center" onClick={onToggleSidebar}>
        <FaBars />
        <h1 className="text-xl font-semibold text-gray-700">
          Hello, <span>{auth.user.name}</span>
        </h1>
      </button>
      
      <div className="flex items-center space-x-4">
        <Link to="profile" className="flex text-secoundColor items-center gap-2 p-2 rounded hover:bg-gray-100 transition">
          <FiUser className="text-secoundColor" /> {/* Icon */}
          Profile
        </Link>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-mainColor text-white px-3 py-2 rounded-md hover:bg-white hover:text-mainColor transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
