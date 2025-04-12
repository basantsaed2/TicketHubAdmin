import React, { useEffect, useState } from 'react';  
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth'
import { PiWarningCircle } from "react-icons/pi";;
import { 
    FaClock, FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaBus, FaPlaneDeparture, FaPlaneArrival 
  } from 'react-icons/fa';
const TripsPage = ({ update, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchTrips, loading: loadingTrips, data: tripsData } = useGet({ url: `${apiUrl}/agent/trip` });
  
  const { deleteData, loadingDelete } = useDelete();
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]); // filtered results
  const [openDelete, setOpenDelete] = useState(null);
  const [searchText, setSearchText] = useState("");
  const auth = useAuth();

  // Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // For viewing Details modal
  const [tripDetailsModalOpen, setTripDetailsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    refetchTrips();
  }, [refetchTrips, update]);

  useEffect(() => {
    if (tripsData && tripsData.trips) {
      console.log("trips Data:", tripsData);
      setTrips(tripsData.trips);
    }
  }, [tripsData]);

  const handleOpenDelete = (id) => {
    setOpenDelete(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Delete trip
  const handleDelete = async (id, name) => {
    const success = await deleteData(`${apiUrl}/agent/trip/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setTrips(trips.filter((trip) => trip.id !== id));
    }
  };

  // Filtering Logic: search filter (case-insensitive) on selected key fields
  useEffect(() => {
    let filtered = trips;
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter(trip => {
        return (
          (trip.trip_type && trip.trip_type.toLowerCase().includes(lowerSearch)) || 
          (trip.trip_name && trip.trip_name.toLowerCase().includes(lowerSearch)) ||
          (trip.bus_number && trip.bus_number.toLowerCase().includes(lowerSearch)) ||
          (trip.status && trip.status.toLowerCase().includes(lowerSearch)) ||
          (trip.from_city && trip.from_city.toLowerCase().includes(lowerSearch)) ||
          (trip.to_city && trip.to_city.toLowerCase().includes(lowerSearch))
        );
      });
    }
    setFilteredTrips(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchText, trips]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredTrips.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTrips.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Update headers to show only important columns in the table.
  const headers = [
    'Trip Name',
    'Trip Type',
    'Date',
    'Available Seats',
    'Price',
    'From - To',
    'Status',
    'Details',
    'Action'
  ];

  return (
    <div className="w-full pb-5 flex flex-col items-start justify-start scrollSection">
      {loadingTrips || loadingDelete ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="w-full sm:min-w-0">
          {/* Search & Filter Section */}
          <div className="flex flex-wrap items-center gap-4 bg-white p-6 border border-gray-200 rounded-xl mb-6">
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
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">SL</th>
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
                    <td colSpan="8" className="text-center text-xl text-gray-500 py-4">
                      No Trips Found
                    </td>
                  </tr>
                ) : (
                  currentRows.map((trip, index) => (
                    <tr
                      key={trip.id}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                      <td className="text-center py-2 text-gray-600">{index + 1}</td>
                       {/* Trip Name */}
                       <td className="text-center py-2 text-gray-600">
                        <span className="block truncate mx-auto">
                          {trip.trip_name || "-"}
                        </span>
                      </td>
                      {/* Trip Type */}
                      <td className="text-center py-2 text-gray-600">
                        <span className="block truncate mx-auto">
                          {trip.trip_type || "-"}
                        </span>
                      </td>
                      {/* Trip Date */}
                      <td className="text-center py-2 text-gray-600">
                        <span className="block truncate mx-auto">
                          {trip.date ?trip.date : trip.start_date}
                        </span>
                      </td>
                      {/* Available Seats */}
                      <td className="text-center py-2 text-gray-600">
                        {trip.avalible_seats || "-"}
                      </td>
                      {/* Price */}
                      <td className="text-center py-2 text-gray-600">
                        {trip.price ? `${trip.price} ${trip.currency}` : "-"}
                      </td>
                      {/* From - To */}
                      <td className="text-center py-2 text-gray-600">
                        {trip.from_city && trip.to_city
                          ? `${trip.from_city} → ${trip.to_city}`
                          : "-"}
                      </td>
                      {/* Status */}
                      <td className="text-center py-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-lg ${
                            trip.status === "active"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {trip.status || "-"}
                        </span>
                      </td>
                      {/* Details */}
                      <td className="text-center py-2">
                        <button
                          onClick={() => {
                            setSelectedTrip(trip);
                            setTripDetailsModalOpen(true);
                          }}
                          className="btn btn-sm btn-outline"
                        >
                          View Details
                        </button>
                      </td>
                      {/* Action */}
                      <td className="text-center py-2">
                        <div className="flex items-center justify-center gap-1">
                          <Link to={`edit/${trip.id}`}>
                            <FaEdit color="#4CAF50" size="24" />
                          </Link>
                          <button type="button" onClick={() => handleOpenDelete(trip.id)}>
                            <MdDelete color="#D01025" size="24" />
                          </button>
                          {openDelete === trip.id && (
                            <Dialog open={true} onClose={handleCloseDelete} className="relative z-10">
                              <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                      <PiWarningCircle color="#1E1E2F" size="60" />
                                      <div className="flex items-center">
                                        <div className="mt-2 text-center">
                                          You will delete trip {trip.trip_type || "-"}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                      <button
                                        className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        onClick={() => handleDelete(trip.id, trip.trip_type)}
                                      >
                                        Delete
                                      </button>
                                      <button
                                        type="button"
                                        data-autofocus
                                        onClick={handleCloseDelete}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </DialogPanel>
                                </div>
                              </div>
                            </Dialog>
                          )}
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
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages || totalPages === 0 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {tripDetailsModalOpen && selectedTrip && (
        <Dialog
          open={tripDetailsModalOpen}
          onClose={() => setTripDetailsModalOpen(false)}
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-lg max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaBus className="text-mainColor" /> Trip Details
                </h3>
                <button
                  onClick={() => setTripDetailsModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Content */}
              <div className="space-y-6">
                {/* Section: Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaPlaneArrival className="text-mainColor" />
                    <span className="font-semibold text-gray-700">Arrival Time:</span>
                    <span className="text-gray-600">{selectedTrip.arrival_time || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPlaneDeparture className="text-mainColor" />
                    <span className="font-semibold text-gray-700">Departure Time:</span>
                    <span className="text-gray-600">{selectedTrip.deputre_time || "-"}</span>
                  </div>
                </div>
                {/* Section: Origin & Destination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-mainColor" />
                      <span className="font-semibold text-gray-700">From:</span>
                    </div>
                    <div className="ml-6 text-gray-600">
                      {selectedTrip.from_city}, {selectedTrip.from_country}
                      <br />
                      <span className="text-sm">Zone: {selectedTrip.from_zone || "-"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-mainColor" />
                      <span className="font-semibold text-gray-700">To:</span>
                    </div>
                    <div className="ml-6 text-gray-600">
                      {selectedTrip.to_city}, {selectedTrip.to_country}
                      <br />
                      <span className="text-sm">Zone: {selectedTrip.to_zone || "-"}</span>
                    </div>
                  </div>
                </div>
                {/* Section: Stations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-mainColor" />
                    <span className="font-semibold text-gray-700">Pickup:</span>
                    <span className="text-gray-600">{selectedTrip.pickup_station || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-mainColor" />
                    <span className="font-semibold text-gray-700">Dropoff:</span>
                    <span className="text-gray-600">{selectedTrip.dropoff_station || "-"}</span>
                  </div>
                </div>
                {/* Section: Bus Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaBus className="text-mainColor" />
                    <span className="font-semibold text-gray-700">Capacity:</span>
                    <span className="text-gray-600">{selectedTrip.bus_capacity || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBus className="text-mainColor" />
                    <span className="font-semibold text-gray-700">Available Seats:</span>
                    <span className="text-gray-600">{selectedTrip.avalible_seats || "-"}</span>
                  </div>
                </div>
                {/* Section: Pricing & Cancellation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-mainColor" />
                    <span className="font-semibold text-gray-700">Price:</span>
                    <span className="text-gray-600">
                      {selectedTrip.price ? `${selectedTrip.price} ${selectedTrip.currency}` : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-mainColor" />
                      <span className="font-semibold text-gray-700">Cancellation Date:</span>
                    </div>
                    <div className="ml-6 text-gray-600">{selectedTrip.cancelation_date || "-"}</div>
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-mainColor" />
                      <span className="font-semibold text-gray-700">Policy:</span>
                      <span className="text-gray-600">
                        {selectedTrip.cancelation_pay_amount} ({selectedTrip.cancelation_pay_value})
                      </span>
                    </div>
                  </div>
                </div>
                {/* Section: Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Trip Type:</span>
                    <span className="text-gray-600">{selectedTrip.trip_type || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Type:</span>
                    <span className="text-gray-600">{selectedTrip.type || "-"}</span>
                  </div>
                </div>
              </div>
              {/* Modal Footer */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setTripDetailsModalOpen(false)}
                  className="btn btn-primary bg-mainColor text-white"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default TripsPage;
