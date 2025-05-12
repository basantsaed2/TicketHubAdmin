import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { FaEdit,FaSearch } from "react-icons/fa";
import { Link} from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { ImCancelCircle } from "react-icons/im";
import { PiWarningCircle } from "react-icons/pi";
import { useChangeState } from '../../../../Hooks/useChangeState';
const PrivateRequestPage = ({ update, setUpdate }) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { refetch: refetchPrivateRequest, loading: loadingPrivateRequest, data: privateRequestData } =useGet({ url:`${apiUrl}/agent/private_request` });
    const { changeState, loadingChange, responseChange } = useChangeState();
    const [privateRequest, setPrivateRequest] = useState([])
    const [filteredPrivateRequest, setFiltreredPrivateRequest] = useState([]); // Store filtered results
    const [searchText, setSearchText] = useState("");
    const [openDelete, setOpenDelete] = useState(null);
    const auth = useAuth()

    //Pagination State
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      refetchPrivateRequest();
    }, [refetchPrivateRequest, update]);

    useEffect(() => {
        if (privateRequestData && privateRequestData) {
                console.log("private request:", privateRequestData);
                setPrivateRequest(privateRequestData.private_requests);
        }
    }, [privateRequestData]); 

    useEffect(() => {
      let filtered = privateRequest;
      if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        filtered = filtered.filter(request => {
          return (
            (request.currency?.name && request.currency.name.toLowerCase().includes(lowerSearch)) ||
            // (request.amount && request.amount.toString().includes(lowerSearch)) ||
            // (request.pending_amount && request.pending_amount.toString().includes(lowerSearch)) ||
            (request.total && request.total.toString().includes(lowerSearch))
          );
        });
      }
      setFiltreredPrivateRequest(filtered);
      setCurrentPage(1); // Reset to first page on filter change
    }, [searchText, privateRequest]);    
    
  const handleOpenDelete = (item) => {
      setOpenDelete(item);
  };
  const handleCloseDelete = () => {
      setOpenDelete(null);
  };

  // Delete Language
  const handleDelete = async (id, name) => {
          const response = await changeState(
            `${apiUrl}/agent/private_request/cancel/${id}`,
            `${name}  Canceld Success.`,
          );
          if (response) {
              // Update Discounts only if changeState succeeded
              setPrivateRequest(
                privateRequest.filter((request) =>
                  request.id !== id
                      )
              );
          }
  };

      // Handlers for filters
      const handleSearch = (e) => {
        setSearchText(e.target.value);
      };

      // Pagination Logic
      const totalPages = Math.ceil(filteredPrivateRequest.length / rowsPerPage);
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const currentRows = filteredPrivateRequest.slice(indexOfFirstRow, indexOfLastRow);

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
        
      const headers = ["User Name","Phone","Email","Date",'Category','Country','City','Address','Status','Action'];   

  return (
    <div className="w-full pb-5 flex items-start justify-start scrollSection">
        {loadingPrivateRequest  ? (
          <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
          </div>
        ) : (
          <div className="w-full sm:min-w-0">
            {/* Search & Filter Section */}
            <div className="flex flex-wrap items-center gap-4 bg-white p-6 shadow-lg rounded-xl mb-6 border border-gray-200">
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
                        No Private Request Found
                      </td>
                    </tr>
                  ) : (
                    currentRows.map((request, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                        <td className="text-center py-2 text-gray-600">{index + 1}</td>
                        <td className="text-center py-2 text-gray-600">{request?.user.name || ''}</td>
                        <td className="text-center py-2 text-gray-600">{request?.user.phone || ''}</td>
                        <td className="text-center py-2 text-gray-600">{request?.user.email || ''}</td>
                        <td className="text-center py-2 text-gray-600">{request?.date || ''}</td>
                        <td className="text-center py-2 text-gray-600">{request?.category?.name || '-'}</td>
                        <td className="text-center py-2 text-gray-600">{request?.from_country?.name || ''} → {request?.to_country?.name || '-'}</td> 
                        <td className="text-center py-2 text-gray-600">{request?.from_city?.name || ''} → {request?.to_city?.name || '-'}</td>
                        <td className="text-center py-2 text-gray-600">{request?.from_address || ''} → {request?.address || '-'}</td>
                        <td className="text-center py-2 text-gray-600">{request?.status || ''}</td>
                        <td className="text-center py-2">
                          <div className="flex items-center justify-center gap-1">
                            <button type="button" className='flex items-center justify-center gap-1' onClick={() => handleOpenDelete(request.id)}>
                              <ImCancelCircle color="#D01025" size="24" />
                              <span className="text-sm font-semibold text-red-600">Cancel</span>
                            </button>
                            {openDelete === request.id && (
                              <Dialog open={true} onClose={handleCloseDelete} className="relative z-10">
                                <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                      <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <PiWarningCircle color="#1E1E2F" size="60" />
                                        <div className="flex items-center">
                                          <div className="mt-2 text-center">
                                          Are you sure you want to cancel this private request of category {request?.category?.name || "-"} ?
                                          </div>
                                        </div>
                                      </div>
                                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                          className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                          onClick={() => handleDelete(request.id, request?.category?.name)}
                                        >
                                          Sure
                                        </button>
                                        <button
                                          type="button"
                                          data-autofocus
                                          onClick={handleCloseDelete}
                                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                        >
                                          No
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
    </div>
  );
}

export default PrivateRequestPage;
