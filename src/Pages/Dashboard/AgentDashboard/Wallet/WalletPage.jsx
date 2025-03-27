import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaEdit,FaSearch } from "react-icons/fa";
import { Link} from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';

const WalletPage = ({ update, setUpdate }) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { refetch: refetchWallet, loading: loadingWallet, data: walletData } =useGet({ url:`${apiUrl}/agent/wallet` });
    const [wallets, setWallets] = useState([])
    const [filteredWallet, setFilteredWallet] = useState([]); // Store filtered results
    const {deleteData, loadingDelete, responseDelete} = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const [searchText, setSearchText] = useState("");
    const auth = useAuth()

    //Pagination State
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      refetchWallet();
    }, [refetchWallet, update]);

    useEffect(() => {
        if (walletData && walletData.wallet) {
                // console.log("car Data:", carData);
                setWallets(walletData.wallets);
        }
    }, [walletData]); 
  
      const handleOpenDelete = (item) => {
          setOpenDelete(item);
      };
      const handleCloseDelete = () => {
          setOpenDelete(null);
      };
  
      // Delete Language
      const handleDelete = async (id, name) => {
              const success = await deleteData(`${apiUrl}/agent/wallet/delete/${id}`, `${name} Deleted Success.`);
  
              if (success) {
                  // Update Discounts only if changeState succeeded
                  setWallets(
                    wallets.filter((car) =>
                      car.id !== id
                          )
                  );
              }
      };

      useEffect(() => {
        let filtered = wallets;
        if (searchText) {
          const lowerSearch = searchText.toLowerCase();
          filtered = filtered.filter(car => {
            return (
              (car.car_number && car.car_number.toLowerCase().includes(lowerSearch)) ||
              (car.car_color && car.car_color.toLowerCase().includes(lowerSearch)) ||
              (car.status && car.status.toLowerCase().includes(lowerSearch)) ||
              (car.brand && car.brand.name && car.brand.name.toLowerCase().includes(lowerSearch)) ||
              (car.category && car.category.name && car.category.name.toLowerCase().includes(lowerSearch)) ||
              (car.model && car.model.name && car.model.name.toLowerCase().includes(lowerSearch)) ||
              (car.car_year && car.car_year.toLowerCase().includes(lowerSearch))
            );
          });
        }
        setFilteredWallet(filtered);
        setCurrentPage(1); // Reset to first page on filter change
      }, [searchText, wallets]);      

      // Handlers for filters
      const handleSearch = (e) => {
        setSearchText(e.target.value);
      };
      // Pagination Logic
      const totalPages = Math.ceil(filteredWallet.length / rowsPerPage);
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const currentRows = filteredWallet.slice(indexOfFirstRow, indexOfLastRow);

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
        
      const headers = ['Name',"Amount",'Pending Amount',"Status"];

  return (
    <div className="w-full pb-5 flex items-start justify-start scrollSection">
        {loadingWallet || loadingDelete ? (
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
                        No Wallets Found
                      </td>
                    </tr>
                  ) : (
                    currentRows.map((wallet, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                      <td className="text-center py-2 text-gray-600">{index + 1}</td>
                      <td className="text-center py-2 text-gray-600 relative">
                        <span className="block max-w-[150px] truncate mx-auto cursor-pointer group">
                          {wallet?.model?.name || "-"}
                          {wallet?.model?.name && wallet?.model?.length > 15 && (
                            <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                              {wallet?.model?.name}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="text-center py-2 text-gray-600">{wallet?.amount || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{wallet?.pending_amount || "-"}</td>
                      <td className="text-center py-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-lg ${
                            wallet?.status === "available"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {wallet?.status || "-"}
                        </span>
                      </td>
                      {/* <td className="text-center py-2">
                        <div className="flex items-center justify-center gap-1">
                          <Link to={`edit/${car.id}`}>
                            <FaEdit color="#4CAF50" size="24" />
                          </Link>
                          <button type="button" onClick={() => handleOpenDelete(car.id)}>
                            <MdDelete color="#D01025" size="24" />
                          </button>
                          {openDelete === car.id && (
                            <Dialog open={true} onClose={handleCloseDelete} className="relative z-10">
                              <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                      <PiWarningCircle color="#1E1E2F" size="60" />
                                      <div className="flex items-center">
                                        <div className="mt-2 text-center">
                                          You will delete car {car.model?.name || "-"}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                      <button
                                        className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        onClick={() => handleDelete(car.id, car.model?.name)}
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
                      </td> */}
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

export default WalletPage;
