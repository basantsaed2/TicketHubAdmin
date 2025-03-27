import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";  
import { FaCarAlt } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { TbBus } from "react-icons/tb";
import { IoMapOutline } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { PiWalletFill } from "react-icons/pi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

const MenuSideAgent = ({ isSidebarCollapsed, onLinkClick }) => {
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

  /* Buses */
  const [isActiveBuses, setIsActiveBuses] = useState(
    stateLink.isActiveBuses ?? false
  );
  const [isActiveBusesIcon, setIsActiveBusesIcon] = useState(
    stateLink.isActiveBusesIcon ?? false
  );

  /* Cars */
  const [isActiveCars, setIsActiveCars] = useState(
    stateLink.isActiveCars ?? false
  );
  const [isActiveCarsIcon, setIsActiveCarsIcon] = useState(
    stateLink.isActiveCarsIcon ?? false
  );

  /* Trips */
  const [isActiveTrips, setIsActiveTrips] = useState(
    stateLink.isActiveTrips?? false
  );
  const [isActiveTripsIcon, setIsActiveTripsIcon] = useState(
    stateLink.isActiveTripsIcon ?? false
  );

  /* Booking */
  const [isActiveBooking, setIsActiveBooking] = useState(
    stateLink.isActiveBooking?? false
  );
  const [isActiveBookingIcon, setIsActiveBookingIcon] = useState(
    stateLink.isActiveBookingIcon ?? false
  );
 
  /* Wallet */
  const [isActiveWallet, setIsActiveWallet] = useState(
    stateLink.isActiveWallet?? false
  );
  const [isActiveWalletIcon, setIsActiveWalletIcon] = useState(
    stateLink.isActiveWalletIcon ?? false
  );

  /* Payment */
  const [isActivePayment, setIsActivePayment] = useState(
    stateLink.isActivePayment?? false
  );
  const [isActivePaymentIcon, setIsActivePaymentIcon] = useState(
    stateLink.isActivePaymentIcon ?? false
  );

  /* Reports */
  const [isActiveReports, setIsActiveReports] = useState(
    stateLink.isActiveReports?? false
  );
  const [isActiveReportsIcon, setIsActiveReportsIcon] = useState(
    stateLink.isActiveReportsIcon ?? false
  );
  

// Helper function to save the current active links state 
const saveActiveLinksState = useCallback(() => {
  const activeLinks = { 
    isActiveHome, isActiveHomeIcon,
    isActiveBuses, isActiveBusesIcon,isActiveCars,isActiveCarsIcon,
    isActiveBooking, isActiveBookingIcon,isActiveTrips,isActiveTripsIcon,
    isActiveWallet, isActiveWalletIcon,isActivePayment,isActivePaymentIcon,
    isActiveReports, isActiveReports
  };
  auth.sidebar = JSON.stringify(activeLinks);
  }, [
  isActiveHome, isActiveHomeIcon,
  isActiveBuses, isActiveBusesIcon,isActiveCars,isActiveCarsIcon,
  isActiveBooking, isActiveBookingIcon,isActiveTrips,isActiveTripsIcon,
  isActiveWallet, isActiveWalletIcon,isActivePayment,isActivePaymentIcon,
  isActiveReports, isActiveReports]);

  // Save state to sidebar at auth when any link state changes
  useEffect(() => {
    saveActiveLinksState();
  }, [
    isActiveHome, isActiveHomeIcon,
    isActiveBuses, isActiveBusesIcon,isActiveCars,isActiveCarsIcon,
    isActiveBooking, isActiveBookingIcon,isActiveTrips,isActiveTripsIcon,
    isActiveWallet, isActiveWalletIcon,isActivePayment,isActivePaymentIcon,
    isActiveReports, isActiveReports
  ]);


  // Handler functions to manage all state
  const handleStateLinks = () => {
    //Home
    setIsActiveHome(false);
    setIsActiveHomeIcon(false);
    //Buses
    setIsActiveBuses(false);
    setIsActiveBusesIcon(false);
    //Cars
    setIsActiveCars(false);
    setIsActiveCarsIcon(false);
    //Trips
    setIsActiveTrips(false);
    setIsActiveTripsIcon(false);
    //Booking
    setIsActiveBooking(false);
    setIsActiveBookingIcon(false);
    //Wallet
    setIsActiveWallet(false);
    setIsActiveWalletIcon(false);
    //Payment
    setIsActivePayment(false);
    setIsActivePaymentIcon(false);
    //Reports
    setIsActiveReports(false);
    setIsActiveReportsIcon(false);
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
    if (result == "/dashboard_operator") {
      handleClickHome();
    }
  }, [location]);

  /* Buses */
  const handleClickBuses= useCallback(() => {
    handleStateLinks();
    setIsActiveBuses(true);
    setIsActiveBusesIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
    if (result == "/dashboard_operator/buses") {
      handleClickBuses();
    }
  }, [location]);

   /* Cars */
   const handleClickCar = useCallback(() => {
    handleStateLinks();
    setIsActiveCars(true);
    setIsActiveCarsIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
    if (result == "/dashboard_operator/cars") {
      handleClickCar();
    }
  }, [location]);

  /* Trips */
  const handleClickTrips = useCallback(() => {
    handleStateLinks();
    setIsActiveTrips(true);
    setIsActiveTripsIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 2).join("/");
    if (result == "/trips") {
      handleClickTrips();
    }
  }, [location]);

  /* Booking */
  const handleClickBooking = useCallback(() => {
    handleStateLinks();
    setIsActiveBooking(true);
    setIsActiveBookingIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 2).join("/");
    if (result == "/booking") {
      handleClickBooking();
    }
  }, [location]);

  /* Wallet */
  const handleClickWallet = useCallback(() => {
    handleStateLinks();
    setIsActiveWallet(true);
    setIsActiveWalletIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 2).join("/");
    if (result == "/wallet") {
      handleClickWallet();
    }
  }, [location]);

  /* Payment */
  const handleClickPayment = useCallback(() => {
    handleStateLinks();
    setIsActivePayment(true);
    setIsActivePaymentIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 2).join("/");
    if (result == "/payment") {
      handleClickPayment();
    }
  }, [location]);

  /* Reports */
  const handleClickReports = useCallback(() => {
    handleStateLinks();
    setIsActiveReports(true);
    setIsActiveReportsIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 2).join("/");
    if (result == "/reports") {
      handleClickReports();
    }
  }, [location]);

 
  return (
    <div className="space-y-4 w-full h-full">
      {/* Home */}
      <Link
        to="/dashboard_operator"
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
           } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
        <RiHome2Line className={`${isActiveHome|| isActiveHomeIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveHome ? "text-mainColor" : "text-white"
              }`}
            >
              Home
            </span>
          )}
        </div>
      </Link>

      {/* Bus */}
      <Link
        to="buses"
        onMouseMove={() => setIsActiveBusesIcon(true)}
        onMouseOut={() => setIsActiveBusesIcon(false)}
        onClick={() => {
          handleClickBuses();
          onLinkClick();
        }}
        className={`
            ${isActiveBuses ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
        <TbBus className={`${isActiveBuses|| isActiveBusesIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveBuses ? "text-mainColor" : "text-white"
              }`}
            >
              Buses
            </span>
          )}
        </div>
      </Link>

      {/* Car */}
      <Link
        to="cars"
        onMouseMove={() => setIsActiveCarsIcon(true)}
        onMouseOut={() => setIsActiveCarsIcon(false)}
        onClick={() => {
          handleClickCar();
          onLinkClick();
        }}
        className={`
            ${isActiveCars ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaCarAlt className={`${isActiveCars|| isActiveCarsIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveCars ? "text-mainColor" : "text-white"
              }`}
            >
              Cars
            </span>
          )}
        </div>
      </Link>

      {/* Trips */}
      <Link
        to="/trips"
        onMouseMove={() => setIsActiveTripsIcon(true)}
        onMouseOut={() => setIsActiveTripsIcon(false)}
        onClick={() => {
          handleClickTrips();
          onLinkClick();
        }}
        className={`
            ${isActiveTrips ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <IoMapOutline  className={`${isActiveTrips|| isActiveTripsIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveTrips ? "text-mainColor" : "text-white"
              }`}
            >
              Trips
            </span>
          )}
        </div>
      </Link>

      {/* Booking */}
      <Link
        to="/booking"
        onMouseMove={() => setIsActiveBookingIcon(true)}
        onMouseOut={() => setIsActiveBookingIcon(false)}
        onClick={() => {
          handleClickBooking();
          onLinkClick();
        }}
        className={`
            ${isActiveBooking ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <IoCheckmarkDoneSharp  className={`${isActiveBooking|| isActiveBookingIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveBooking ? "text-mainColor" : "text-white"
              }`}
            >
              Booking
            </span>
          )}
        </div>
      </Link>

      {/* Wallet */}
      <Link
        to="/wallet"
        onMouseMove={() => setIsActiveWalletIcon(true)}
        onMouseOut={() => setIsActiveWalletIcon(false)}
        onClick={() => {
          handleClickWallet();
          onLinkClick();
        }}
        className={`
            ${isActiveWallet ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <PiWalletFill  className={`${isActiveWallet|| isActiveWalletIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveWallet ? "text-mainColor" : "text-white"
              }`}
            >
              Wallet
            </span>
          )}
        </div>
      </Link>

      {/* Payment */}
      <Link
        to="/payments"
        onMouseMove={() => setIsActivePaymentIcon(true)}
        onMouseOut={() => setIsActivePaymentIcon(false)}
        onClick={() => {
          handleClickPayment();
          onLinkClick();
        }}
        className={`
            ${isActivePayment ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <MdOutlineAttachMoney  className={`${isActivePayment|| isActivePaymentIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActivePayment ? "text-mainColor" : "text-white"
              }`}
            >
              Payments
            </span>
          )}
        </div>
      </Link>

      {/* Reports */}
      <Link
        to="/reports"
        onMouseMove={() => setIsActiveReportsIcon(true)}
        onMouseOut={() => setIsActiveReportsIcon(false)}
        onClick={() => {
          handleClickReports();
          onLinkClick();
        }}
        className={`
            ${isActiveReports ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <TbReportSearch  className={`${isActiveReports|| isActiveReportsIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveReports ? "text-mainColor" : "text-white"
              }`}
            >
              Reports
            </span>
          )}
        </div>
      </Link>

  
    </div>
  );
};

export default MenuSideAgent;
