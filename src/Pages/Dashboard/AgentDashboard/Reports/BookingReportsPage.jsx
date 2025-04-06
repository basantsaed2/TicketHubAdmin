import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { FaEdit,FaSearch } from "react-icons/fa";
import { Link} from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';

const BookingReportsPage = ({ update, setUpdate }) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { refetch: refetchBookingReports, loading: loadingBookingReports, data: bookingReportsData } =useGet({ url:`${apiUrl}/agent/report/booking` });
    const [bookingReports, setBookingReports] = useState([])
    const [filteredReports, setFilteredReports] = useState([]); // Store filtered results
    const [searchText, setSearchText] = useState("");
    const auth = useAuth()

    //Pagination State
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      refetchBookingReports();
    }, [refetchBookingReports, update]);

    useEffect(() => {
        if (bookingReportsData && bookingReportsData) {
                console.log("booking Repoets:", bookingReportsData);
                // setWallets(walletData.wallets);
        }
    }, [bookingReportsData]); 

    // useEffect(() => {
    //   let filtered = wallets;
    //   if (searchText) {
    //     const lowerSearch = searchText.toLowerCase();
    //     filtered = filtered.filter(wallet => {
    //       return (
    //         (wallet.currency?.name && wallet.currency.name.toLowerCase().includes(lowerSearch)) ||
    //         (wallet.amount && wallet.amount.toString().includes(lowerSearch)) ||
    //         (wallet.pending_amount && wallet.pending_amount.toString().includes(lowerSearch)) ||
    //         (wallet.total && wallet.total.toString().includes(lowerSearch))
    //       );
    //     });
    //   }
    //   setFilteredWallet(filtered);
    //   setCurrentPage(1); // Reset to first page on filter change
    // }, [searchText, wallets]);      

      // Handlers for filters
      const handleSearch = (e) => {
        setSearchText(e.target.value);
      };
      // Pagination Logic
    //   const totalPages = Math.ceil(filteredWallet.length / rowsPerPage);
    //   const indexOfLastRow = currentPage * rowsPerPage;
    //   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    //   const currentRows = filteredWallet.slice(indexOfFirstRow, indexOfLastRow);

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
        
      const headers = ["Amount",'Pending Amount','Total'];

  return (
    <div className="w-full pb-5 flex items-start justify-start scrollSection">
        {loadingBookingReports  ? (
          <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
          </div>
        ) : (
          <div className="w-full sm:min-w-0">
            {/* Search & Filter Section */}
            {/* <div className="flex flex-wrap items-center gap-4 bg-white p-6 shadow-lg rounded-xl mb-6 border border-gray-200">
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
            </div> */}
            {/* Rows per Page */}
            {/* <div className="flex items-center space-x-2 mb-5">
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
            </div> */}
            {/* Table Container */}
            {/* <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
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
                      <td className="text-center py-2 text-gray-600">{wallet?.amount || 0} {wallet?.currency?.name || '-'}</td>
                      <td className="text-center py-2 text-gray-600">{wallet?.pending_amount || 0} {wallet?.currency?.name || '-'}</td>
                      <td className="text-center py-2 text-gray-600">{wallet?.total|| 0} {wallet?.currency?.name || '-'}</td>
                    </tr>                    
                    ))
                  )}
                </tbody>
              </table>
            </div> */}
            {/* Pagination Controls */}
            {/* <div className="flex justify-between items-center mt-4">
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
            </div> */}
          </div>
        )}
    </div>
  );
}

export default BookingReportsPage;
