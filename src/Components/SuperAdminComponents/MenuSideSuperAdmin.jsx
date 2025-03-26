import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";  
import {IconHome,IconUser} from "../../Assets/Icons/AllIcons";
const MenuSideSuperAdmin = ({ isSidebarCollapsed, onLinkClick }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const hideSide = auth.hideSidebar;
  const stateLink = auth.sidebar ? JSON.parse(auth.sidebar) : {};

  // Initialize component state from `auth.sidebar` state
  /* Home */
  const [isActiveHome, setIsActiveHome] = useState(
    stateLink.isActiveHome ?? true
  );
  const [isActiveHomeIcon, setIsActiveHomeIcon] = useState(
    stateLink.isActiveHomeIcon ?? true
  );

  /* Users */
  const [isActiveUsers, setIsActiveUsers] = useState(
    stateLink.isActiveUsers ?? false
  );
  const [isActiveUsersIcon, setIsActiveUsersIcon] = useState(
    stateLink.isActiveUsersIcon ?? false
  );
 
  

// Helper function to save the current active links state 
const saveActiveLinksState = useCallback(() => {
  const activeLinks = { 
    isActiveHome, isActiveHomeIcon,
    isActiveUsers, isActiveUsersIcon,
  };
  auth.sidebar = JSON.stringify(activeLinks);
}, [
  isActiveHome, isActiveHomeIcon, isActiveUsers, isActiveUsersIcon,
]);

// Save state to sidebar at auth when any link state changes
useEffect(() => {
  saveActiveLinksState();
}, [
  isActiveHome, isActiveHomeIcon, isActiveUsers, isActiveUsersIcon,
]);


  // Handler functions to manage all state
  const handleStateLinks = () => {
    setIsActiveHome(false);
    setIsActiveHomeIcon(false);

    //User
    setIsActiveUsers(false);
    setIsActiveUsersIcon(false);
  };

  // Handler functions to manage navigation state
  /* Home */
  const handleClickHome = useCallback(() => {
    handleStateLinks();
    setIsActiveHome(true);
    setIsActiveHomeIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 2).join("/");
    if (result == "/dashboard_admin") {
      handleClickHome();
    }
  }, [location]);

  /* User */
  const handleClickUser = useCallback(() => {
    handleStateLinks();
    setIsActiveUsers(true);
    setIsActiveUsersIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 2).join("/");
    if (result == "/users") {
      handleClickUser();
    }
  }, [location]);

  //Users
  // const handleClickUsers = (e) => {
  //   e.preventDefault(); // Prevent default navigation issues
  //   setIsOpenUsers((prev) => !prev); // Properly toggle dropdown
  //   setIsActiveUsersIcon((prev) => !prev);
  //   setIsActiveUsers((prev) => !prev);
  // };
  // // ✅ Ensure Users closes when clicking it again
  // useEffect(() => {
  //   const result = pathName.split("/").slice(0, 3).join("/");
  //   if (
  //     result === "/dashboard_agent/users" &&
  //     ![
  //       "/dashboard_agent/users/customers",
  //       "/dashboard_agent/users/leads",
  //       "/dashboard_agent/users/suppliers",
  //     ].some((path) => pathName.startsWith(path))
  //   ) {
  //     if (!isOpenUsers) {
  //       setIsOpenUsers(true);
  //     }
  //     navigate("/dashboard_agent/users/customers");
  //   }
  // }, [location, isOpenUsers]);

 
  return (
    <div className="space-y-4 w-full h-full">
      {/* Home */}
      <Link
        to="/dashboard_admin"
        onMouseMove={() => setIsActiveHomeIcon(true)}
        onMouseOut={() => setIsActiveHomeIcon(false)}
        onClick={() => {
          handleClickHome();
          onLinkClick();
        }}
        className={`
            ${isActiveHome ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-white hover:text-secoundColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <IconHome active={isActiveHomeIcon || isActiveHome}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-secoundColor font-TextFontRegular ml-2 ${
                isActiveHome ? "text-secoundColor" : "text-white"
              }`}
            >
              Home
            </span>
          )}
        </div>
      </Link>

       {/* User */}
       <Link
        to="/users"
        onMouseMove={() => setIsActiveUsersIcon(true)}
        onMouseOut={() => setIsActiveUsersIcon(false)}
        onClick={() => {
          handleClickUser();
          onLinkClick();
        }}
        className={`
            ${isActiveUsers ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-white hover:text-secoundColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <IconUser active={isActiveUsersIcon || isActiveUsers}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-secoundColor font-TextFontRegular ml-2 ${
                isActiveUsers ? "text-secoundColor" : "text-white"
              }`}
            >
              Users
            </span>
          )}
        </div>
      </Link>

      {/* Users */}
      {/* <Link
        to="users"
        onMouseMove={() => setIsActiveUsersIcon(true)}
        onMouseOut={() => setIsActiveUsersIcon(false)}
        onClick={handleClickUsers}
        className={`
          ${isActiveUsers ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaUsers
            className={`${
              isActiveUsersIcon || isActiveUsers
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveUsers ? "text-mainColor" : "text-white"
              }`}
            >
              Users
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveUsers ? "text-mainColor rotate-90" : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link> */}
      {/* <div
        className={`${
          isOpenUsers && !isSidebarCollapsed ? "h-17" : "h-0 "
        } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"users/customers"}
            onClick={() => {
              handleClickCustomers();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveCustomers
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Customers
            </li>
          </Link>
          <Link
            to={"users/leads"}
            onClick={() => {
              handleClickLeads();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveLeads
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Leads
            </li>
          </Link>
          <Link
            to={"users/suppliers"}
            onClick={() => {
              handleClickSuppliers();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveSuppliers
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Suppliers
            </li>
          </Link>
        </ul>
      </div> */}

    </div>
  );
};

export default MenuSideSuperAdmin;
