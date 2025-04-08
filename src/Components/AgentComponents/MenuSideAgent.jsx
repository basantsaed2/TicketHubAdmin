import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";  
import { FaCarAlt } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { TbBus } from "react-icons/tb";
import { IoMapOutline } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { PiWalletFill } from "react-icons/pi";
import { MdOutlineAttachMoney, MdOutlinePayments } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RiChatPrivateLine } from "react-icons/ri";

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

  /* Hiaces */
  const [isActiveHiaces, setIsActiveHiaces] = useState(
    stateLink.isActiveHiaces ?? false
  );
  const [isActiveHiacesIcon, setIsActiveHiacesIcon] = useState(
    stateLink.isActiveHiacesIcon ?? false
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

  /* Payout */
  const [isActivePayout, setIsActivePayout] = useState(
    stateLink.isActivePayout?? false
  );
  const [isActivePayoutIcon, setIsActivePayoutIcon] = useState(
    stateLink.isActivePayoutIcon ?? false
  );

  /* Payments */
  const [isActivePayments, setIsActivePayments] = useState(
    stateLink.isActivePayments?? false
  );
  const [isActivePaymentsIcon, setIsActivePaymentsIcon] = useState(
    stateLink.isActivePaymentsIcon ?? false
  );

  /* PrivateRequest */
  const [isActivePrivateRequest, setIsActivePrivateRequest] = useState(
    stateLink.isActivePrivateRequest ?? false
  );
  const [isActivePrivateRequestIcon, setIsActivePrivateRequestIcon] =
    useState(stateLink.isActivePrivateRequestIcon ?? false
  );

  /* Reports */
  const [isOpenReports, setIsOpenReports] = useState(
    stateLink.isOpenReports ?? false
  );
  const [isActiveReports, setIsActiveReports] = useState(
    stateLink.isActiveReports?? false
  );
  const [isActiveReportsIcon, setIsActiveReportsIcon] = useState(
    stateLink.isActiveReportsIcon ?? false
  );
    // Reports Lists
    const [isActiveBookingReports, setIsActiveBookingReports] = useState(
      stateLink.isActiveBookingReports ?? false
    );
    const [isActiveEarningReports, setIsActiveEarningReports] = useState(
      stateLink.isActiveEarningReports ?? false
    );
  

// Helper function to save the current active links state 
const saveActiveLinksState = useCallback(() => {
  const activeLinks = { 
    isActiveHome, isActiveHomeIcon,isActiveHiaces,isActiveHiacesIcon,
    isActiveBuses, isActiveBusesIcon,isActiveCars,isActiveCarsIcon,
    isActiveBooking, isActiveBookingIcon,isActiveTrips,isActiveTripsIcon,
    isActiveWallet, isActiveWalletIcon,isActivePayout,isActivePayoutIcon,
    isActivePrivateRequest, isActivePrivateRequestIcon,isActivePayments,isActivePaymentsIcon,
    isActiveReports, isActiveReportsIcon, isOpenReports,
    isActiveBookingReports,isActiveEarningReports
  };
  auth.sidebar = JSON.stringify(activeLinks);
  }, [
  isActiveHome, isActiveHomeIcon,isActiveHiaces,isActiveHiacesIcon,
  isActiveBuses, isActiveBusesIcon,isActiveCars,isActiveCarsIcon,
  isActiveBooking, isActiveBookingIcon,isActiveTrips,isActiveTripsIcon,
  isActiveWallet, isActiveWalletIcon,isActivePayout,isActivePayoutIcon,
  isActivePrivateRequest, isActivePrivateRequestIcon,isActivePayments,isActivePaymentsIcon,
  isActiveReports, isActiveReportsIcon, isOpenReports,
  isActiveBookingReports,isActiveEarningReports]);

  // Save state to sidebar at auth when any link state changes
  useEffect(() => {
    saveActiveLinksState();
  }, [
    isActiveHome, isActiveHomeIcon,isActiveHiaces,isActiveHiacesIcon,
    isActiveBuses, isActiveBusesIcon,isActiveCars,isActiveCarsIcon,
    isActiveBooking, isActiveBookingIcon,isActiveTrips,isActiveTripsIcon,
    isActiveWallet, isActiveWalletIcon,isActivePayout,isActivePayoutIcon,
    isActivePrivateRequest, isActivePrivateRequestIcon,isActivePayments,isActivePaymentsIcon,
    isActiveReports, isActiveReportsIcon, isOpenReports,
    isActiveBookingReports,isActiveEarningReports  ]);


  // Handler functions to manage all state
  const handleStateLinks = () => {
    //Home
    setIsActiveHome(false);
    setIsActiveHomeIcon(false);
    //Buses
    setIsActiveBuses(false);
    setIsActiveBusesIcon(false);
    //Hiaces
    setIsActiveHiaces(false);
    setIsActiveHiacesIcon(false);
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
    //Payout
    setIsActivePayout(false);
    setIsActivePayoutIcon(false);
    //Payments
    setIsActivePayments(false);
    setIsActivePaymentsIcon(false);
    //PrivateRequest
    setIsActivePrivateRequest(false);
    setIsActivePrivateRequestIcon(false);

    //Reports Lists
    // setIsActiveReports(false);
    // setIsActiveReportsIcon(false);
    // setIsOpenReports(false);
    setIsActiveBookingReports(false);
    setIsActiveEarningReports(false);
  };

  // Handler function to close the sidebar when a link is clicked
  const handleCloseSidebar = () => {
    setIsActiveReports(false);
    setIsActiveReportsIcon(false);
    setIsOpenReports(false);
  }

  // Handler functions to manage navigation state
  /* Home */
  const handleClickHome = useCallback(() => {
    handleStateLinks();
    handleCloseSidebar();
    
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
    handleCloseSidebar();

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

  /* Hices */
  const handleClickHices= useCallback(() => {
    handleStateLinks();
    handleCloseSidebar();

    setIsActiveHiaces(true);
    setIsActiveHiacesIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
    if (result == "/dashboard_operator/hiaces") {
      handleClickHices();
    }
  }, [location]);

  /* Cars */
   const handleClickCar = useCallback(() => {
    handleStateLinks();
    handleCloseSidebar();

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
    handleCloseSidebar();

    setIsActiveTrips(true);
    setIsActiveTripsIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
    if (result == "/dashboard_operator/trips") {
      handleClickTrips();
    }
  }, [location]);

  /* Booking */
  const handleClickBooking = useCallback(() => {
    handleStateLinks();
    handleCloseSidebar();

    setIsActiveBooking(true);
    setIsActiveBookingIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
    if (result == "/dashboard_operator/booking") {
      handleClickBooking();
    }
  }, [location]);

  /* Wallet */
  const handleClickWallet = useCallback(() => {
    handleStateLinks();
    handleCloseSidebar();

    setIsActiveWallet(true);
    setIsActiveWalletIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
    if (result == "/dashboard_operator/wallet") {
      handleClickWallet();
    }
  }, [location]);

  /* Payout */
  const handleClickPayout = useCallback(() => {
    handleStateLinks();
    handleCloseSidebar();

    setIsActivePayout(true);
    setIsActivePayoutIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
    if (result == "/dashboard_operator/payout") {
      handleClickPayout();
    }
  }, [location]);

  /* Payments */
  const handleClickPayments = useCallback(() => {
    handleStateLinks();
    handleCloseSidebar();

    setIsActivePayments(true);
    setIsActivePaymentsIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
    if (result == "/dashboard_operator/payments") {
      handleClickPayments();
    }
  }, [location]);

  /* Private Request */
  const handleClickPrivateRequest = useCallback(() => {
    handleStateLinks();
    handleCloseSidebar();

    setIsActivePrivateRequest(true);
    setIsActivePrivateRequestIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
    if (result == "/dashboard_operator/private_request") {
      handleClickPrivateRequest();
    } 
  }, [location]);

  /* Reports */
  const handleClickReports = useCallback(() => {
    handleStateLinks();
    setIsOpenReports((prev) => !prev); // Properly toggle dropdown
    setIsActiveReportsIcon((prev) => !prev);
    setIsActiveReports((prev) => !prev);
  }, []);
  // ✅ Ensure Users closes when clicking it again
  useEffect(() => {
    const result = pathName.split("/").slice(0, 3).join("/");
    if (
      result === "/dashboard_operator/reports" &&
      ![
        "/dashboard_operator/reports/booking_reports",
        "/dashboard_operator/reports/earning_reports",
      ].some((path) => pathName.startsWith(path))
    ) {
      if (!isOpenReports) {
        setIsOpenReports(true);
      }
      navigate("/dashboard_operator/reports/booking_reports"); // Default to booking reports
    }
  }, [location, isOpenReports]);

  // Reports Lists
  const handleClickBookingReports = useCallback(() => {
    handleStateLinks();
    setIsOpenReports(true);
    setIsActiveReportsIcon(true);
    setIsActiveReports(true);
    setIsActiveBookingReports(true);
    setIsActiveEarningReports(false);

  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_operator/reports/booking_reports")) {
      handleClickBookingReports();
    }
  }, [location, handleClickBookingReports]);

  const handleClickEarningReports = useCallback(() => {
    handleStateLinks();
    setIsOpenReports(true);
    setIsActiveReportsIcon(true);
    setIsActiveReports(true);
    setIsActiveEarningReports(true);
    setIsActiveBookingReports(false);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_operator/reports/earning_reports")) {
      handleClickEarningReports();
    }
  }, [location, handleClickEarningReports]);
 
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
           } hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
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
           } hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
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

      {/* Hices */}
      <Link
        to="hiaces"
        onMouseMove={() => setIsActiveHiacesIcon(true)}
        onMouseOut={() => setIsActiveHiacesIcon(false)}
        onClick={() => {
          handleClickHices();
          onLinkClick();
        }}
        className={`
            ${isActiveHiaces ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
        <MdOutlineLocalShipping className={`${isActiveHiaces|| isActiveHiacesIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveHiaces ? "text-mainColor" : "text-white"
              }`}
            >
              Hiaces
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
           } hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
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
        to="trips"
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
           } hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
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
        to="booking"
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
           } hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
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
        to="wallet"
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
           } hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
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

      {/* Payout */}
      <Link
        to="payout"
        onMouseMove={() => setIsActivePayoutIcon(true)}
        onMouseOut={() => setIsActivePayoutIcon(false)}
        onClick={() => {
          handleClickPayout();
          onLinkClick();
        }}
        className={`
            ${isActivePayout ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <MdOutlineAttachMoney  className={`${isActivePayout|| isActivePayoutIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActivePayout ? "text-mainColor" : "text-white"
              }`}
            >
              Payout
            </span>
          )}
        </div>
      </Link>

      {/* Payments */}
      <Link
        to="payments"
        onMouseMove={() => setIsActivePaymentsIcon(true)}
        onMouseOut={() => setIsActivePaymentsIcon(false)}
        onClick={() => {
          handleClickPayments();
          onLinkClick();
        }}
        className={`
            ${isActivePayments ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <MdOutlinePayments  className={`${isActivePayments|| isActivePaymentsIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActivePayments ? "text-mainColor" : "text-white"
              }`}
            >
              Payments
            </span>
          )}
        </div>
      </Link>

      {/* Private Request */}
      <Link
        to="private_request"
        onMouseMove={() => setIsActivePrivateRequestIcon(true)}
        onMouseOut={() => setIsActivePrivateRequestIcon(false)}
        onClick={() => {
          handleClickPrivateRequest();
          onLinkClick();
        }}
        className={`
            ${isActivePrivateRequest ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <RiChatPrivateLine  className={`${isActivePrivateRequest|| isActivePrivateRequestIcon ? 'text-mainColor': 'text-white'}`}/>
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActivePrivateRequest ? "text-mainColor" : "text-white"
              }`}
            >
              Private Request
            </span>
          )}
        </div>
      </Link>

      {/* Reports */}
      <Link
        to="reports"
        onMouseMove={() => setIsActiveReportsIcon(true)}
        onMouseOut={() => setIsActiveReportsIcon(false)}
        onClick={handleClickReports}
        className={`
          ${isActiveReports ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-tap hover:bg-cover hover:bg-center hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <TbReportSearch
            className={`${
              isActiveReportsIcon || isActiveReports
                ? "text-mainColor"
                : "text-white"
            }`}
          />
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
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveReports ? "text-mainColor rotate-90" : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div
        className={`${
          isActiveReports && !isSidebarCollapsed ? "h-17" : "h-0 "
        } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"reports/booking_reports"}
            onClick={() => {
              handleClickBookingReports();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveBookingReports
                  ? "rounded-xl bg-tap bg-cover bg-center text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-tap hover:bg-cover hover:bg-center transition-all duration-300 hover:text-mainColor`}
            >
              Booking
            </li>
          </Link>
          <Link
            to={"reports/earning_reports"}
            onClick={() => {
              handleClickEarningReports();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveEarningReports
                  ? "rounded-xl bg-tap bg-cover bg-center text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-tap hover:bg-cover hover:bg-center transition-all duration-300 hover:text-mainColor`}
            >
              Earning
            </li>
          </Link>
        </ul>
      </div>

    </div>
  );
};

export default MenuSideAgent;
