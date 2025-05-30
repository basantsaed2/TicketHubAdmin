import React, { useEffect, useState, useMemo } from 'react'; 
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';

const BookingReportsPage = ({ update, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchBooking, loading: loadingBooking, data: bookingData } = useGet({ url: `${apiUrl}/agent/report/booking` });
  const [BookingReports, setBookingReports] = useState([]);
  const [filteredBooking, setFiltreredPrivateRequest] = useState([]);
  const { deleteData, loadingDelete } = useDelete();
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const auth = useAuth();

  // Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    refetchBooking();
  }, [refetchBooking, update]);

   useEffect(() => {
          if (bookingData && bookingData.bookings) {
                  console.log("booking Data:", bookingData);
                  setBookingReports(bookingData.bookings);
          }
     }, [bookingData]); 

  // Filtering Logic: search filter (case-insensitive)
    useEffect(() => {
      let filtered = BookingReports;
    
      if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        filtered = filtered.filter(booking => {
          return (
            (booking.currency?.name && booking.currency.name.toLowerCase().includes(lowerSearch)) ||
            (booking.trip?.trip_name && booking.trip.trip_name.toLowerCase().includes(lowerSearch)) ||
            (booking.user?.name && booking.user.name.toLowerCase().includes(lowerSearch)) ||
            (booking.amount && booking.amount.toString().toLowerCase().includes(lowerSearch))
          );
        });
      }
    
      if (filterDate) {
        filtered = filtered.filter(booking => booking.travel_date === filterDate);
      }
    
      setFiltreredPrivateRequest(filtered);
      setCurrentPage(1); // Reset to first page on filter change
    }, [searchText, filterDate, BookingReports]);
  

  // Pagination Logic
  const totalPages = Math.ceil(filteredBooking.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBooking.slice(indexOfFirstRow, indexOfLastRow);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };
  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const headers = ['Trip Name','Date','Route City',"Supplier",'Type','Price','Details',"Status"];

  return (
    <div className="w-full pb-5 flex flex-col items-start justify-start scrollSection">
      {loadingBooking || loadingDelete ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="w-full sm:min-w-0">
          {/* Tabs */}
          {/* Search & Filter Section */}
          <div className="w-full flex flex-wrap items-center gap-4 bg-white p-6 border border-gray-200 rounded-xl mb-6">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg w-full md:w-[280px] border border-gray-300">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearch}
                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg w-full md:w-[280px] border border-gray-300">
              <label className="text-gray-600 text-sm font-medium">Filter by Date :</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>
          {/* Rows per Page */}
          <div className="flex items-center space-x-2 mb-5">
            <label className="text-gray-700 font-medium">Rows per page:</label>
            <div className="w-full md:w-[120px]">
              <select
                onChange={handleRowsChange}
                value={rowsPerPage}
                className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer"
              >
                <option value="5">5 rows</option>
                <option value="10">10 rows</option>
                <option value="20">20 rows</option>
                <option value="30">30 rows</option>
                <option value="50">50 rows</option>
              </select>
            </div>
          </div>
          {/* Table Container */}
          <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-200 text-gray-700">
                <tr className="border-t-2 border-b-2">
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                    SL
                  </th>
                  {headers.map((name, index) => (
                    <th
                      key={index}
                      className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg py-3 border-b-2"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-xl text-gray-500 py-4">
                      No Bookings Found
                    </td>
                  </tr>
                ) : (
                  currentRows.map((booking, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                      <td className="text-center py-2 text-gray-600">{index + 1}</td>
                      <td className="text-center py-2 text-gray-600">{booking?.trip?.trip_name || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{booking?.travel_date || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{booking?.trip?.city?.name || "-"} → {booking?.trip?.to_city?.name || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{booking?.user?.name || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{booking?.trip_type || '-'}</td>
                      <td className="text-center py-2 text-gray-600">{booking?.operator || 0} {booking?.currency?.name}</td>
                      <td className="text-center py-2 text-secoundColor underline cursor-pointer">
                      <Link to={`details/${booking.id}`} state={{ booking }}> View </Link></td>
                      <td className="text-center py-2">
                        <div
                          className={`px-2 py-1 border rounded-lg shadow-sm font-medium text-center inline-block
                                      ${
                                        booking?.status === "pending"
                                          ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                                          : booking?.status === "confirmed"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700 border-red-400"
                                      }`}
                        >
                          {booking?.status === "pending" && "Pending"}
                          {booking?.status === "confirmed" && "Confirmed"}
                          {booking?.status === "canceled" && "Canceled"}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages || totalPages === 0 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingReportsPage;

