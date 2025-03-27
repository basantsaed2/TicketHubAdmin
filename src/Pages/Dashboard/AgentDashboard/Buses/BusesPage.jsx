import React, { useEffect, useState } from 'react'; 
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaEdit, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';

const BusesPage = ({ update, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchBuses, loading: loadingBuses, data: busData } = useGet({ url: `${apiUrl}/agent/bus` });
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]); // Store filtered results
  const [openDelete, setOpenDelete] = useState(null);
  const [searchText, setSearchText] = useState("");
  const auth = useAuth();

  // Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // For viewing Amenities modal
  const [amenitiesModalOpen, setAmenitiesModalOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    refetchBuses();
  }, [refetchBuses, update]);

  useEffect(() => {
    if (busData && busData.buses) {
      // console.log("bus Data:", busData);
      setBuses(busData.buses);
    }
  }, [busData]);

  const handleOpenDelete = (item) => {
    setOpenDelete(item);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Delete bus
  const handleDelete = async (id, name) => {
    const success = await deleteData(`${apiUrl}/agent/bus/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setBuses(buses.filter((bus) => bus.id !== id));
    }
  };

  // Filtering Logic: search filter (case-insensitive)
  useEffect(() => {
    let filtered = buses;
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter(bus => {
        return (
          (bus.bus_number && bus.bus_number.toString().toLowerCase().includes(lowerSearch)) ||
          (bus.status && bus.status.toLowerCase().includes(lowerSearch)) ||
          (bus.type && bus.type.toLowerCase().includes(lowerSearch)) ||
          (bus.bus_type && bus.bus_type.name && bus.bus_type.name.toLowerCase().includes(lowerSearch))
          // Add any additional properties you want to search
        );
      });
    }
    setFilteredBuses(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchText, buses]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredBuses.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBuses.slice(indexOfFirstRow, indexOfLastRow);

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

  const headers = ['Type', "Image", 'Capacity', 'Available Seats', "Number", "Amenities", "Status", "Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start scrollSection">
      {loadingBuses || loadingDelete ? (
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
                      No Buses Found
                    </td>
                  </tr>
                ) : (
                  currentRows.map((bus, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                      <td className="text-center py-2 text-gray-600">{index + 1}</td>
                      <td className="text-center py-2 text-gray-600">
                        <span className="block max-w-[150px] truncate mx-auto cursor-pointer">
                          {bus?.bus_type?.name || "-"}
                        </span>
                      </td>
                      <td className="text-center py-2">
                        {bus?.image_link ? (
                          <img src={bus.image_link} alt="bus" className="mx-auto h-10" />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-center py-2 text-gray-600">{bus?.capacity || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{bus?.bus_type?.seats_count || 0}</td>
                      <td className="text-center py-2 text-gray-600">{bus?.bus_number || "-"}</td>
                      {/* Amenities Column */}
                      <td className="text-center py-2">
                        {bus?.aminity && bus.aminity.length > 0 ? (
                          <button
                            onClick={() => {
                              setSelectedAmenities(bus.aminity);
                              setAmenitiesModalOpen(true);
                            }}
                            className="text-blue-500 underline"
                          >
                            View Amenities
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-center py-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-lg ${
                            bus?.status === "active"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {bus?.status || "-"}
                        </span>
                      </td>
                      <td className="text-center py-2">
                        <div className="flex items-center justify-center gap-1">
                          <Link to={`edit/${bus.id}`}>
                            <FaEdit color="#4CAF50" size="24" />
                          </Link>
                          <button type="button" onClick={() => handleOpenDelete(bus.id)}>
                            <MdDelete color="#D01025" size="24" />
                          </button>
                          {openDelete === bus.id && (
                            <Dialog open={true} onClose={handleCloseDelete} className="relative z-10">
                              <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                      <PiWarningCircle color="#1E1E2F" size="60" />
                                      <div className="flex items-center">
                                        <div className="mt-2 text-center">
                                          You will delete bus type {bus.bus_type?.name || "-"}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                      <button
                                        className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        onClick={() => handleDelete(bus.id, bus.bus_type?.name)}
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
     {amenitiesModalOpen && (
        <Dialog open={amenitiesModalOpen} onClose={() => setAmenitiesModalOpen(false)} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="w-full fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-lg">
                <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h3 className="text-2xl font-bold text-gray-800">Amenities</h3>
                <button
                    onClick={() => setAmenitiesModalOpen(false)}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {selectedAmenities.map((amenity) => (
                    <div key={amenity.id} className="flex flex-col items-center p-4 border rounded-lg transition hover:shadow-md">
                    <img src={amenity.icon_link} alt={amenity.name} className="w-12 h-12 mb-2" />
                    <span className="text-lg font-medium text-gray-700">{amenity.name}</span>
                    </div>
                ))}
                </div>
                <div className="mt-8 flex justify-end">
                <button onClick={() => setAmenitiesModalOpen(false)} className="btn btn-primary bg-mainColor text-white">
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

export default BusesPage;
