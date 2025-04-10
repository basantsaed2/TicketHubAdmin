import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { FaEdit,FaSearch } from "react-icons/fa";
import { Link} from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';

const WalletPage = ({ update, setUpdate }) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { refetch: refetchWallet, loading: loadingWallet, data: walletData } =useGet({ url:`${apiUrl}/agent/wallet` });
    const [wallets, setWallets] = useState([])
    const [filteredWallet, setFilteredWallet] = useState([]); // Store filtered results
    const [searchText, setSearchText] = useState("");
    const auth = useAuth()

    //Pagination State
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      refetchWallet();
    }, [refetchWallet, update]);

    useEffect(() => {
        if (walletData && walletData.wallets) {
                // console.log("car Data:", carData);
                setWallets(walletData.wallets);
        }
    }, [walletData]); 

    useEffect(() => {
      let filtered = wallets;
      if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        filtered = filtered.filter(wallet => {
          return (
            (wallet.currency?.name && wallet.currency.name.toLowerCase().includes(lowerSearch)) ||
            (wallet.amount && wallet.amount.toString().includes(lowerSearch)) ||
            (wallet.pending_amount && wallet.pending_amount.toString().includes(lowerSearch)) ||
            (wallet.total && wallet.total.toString().includes(lowerSearch))
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
        

  return (
    <div className="w-full pb-5 flex items-start justify-start scrollSection">
        {loadingWallet  ? (
          <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
          </div>
        ) : (
          <div className="w-full sm:min-w-0">
            {/* Search & Filter Section */}
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

              <div className="mt-6">
                {currentRows.length > 0 ? (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentRows.map((wallet, index) => (
                      <div
                        key={wallet.id}
                        className="flex flex-col gap-4 border border-mainColor p-4 rounded-lg shadow-md"
                      >
                        <p className="text-md font-semibold">
                          Currency: {wallet.currency?.name}
                        </p>
                        <p className="text-gray-500">
                        Current Balance:{' '}
                          <span className="text-black text-xl font-semibold">
                            {wallet.amount} {wallet.currency?.name}
                          </span>
                        </p>
                        <Link
                        className="bg-orange-500 text-center text-white px-3 py-2 rounded-md hover:bg-orange-600 transition duration-200"
                        to={`payout_request/${wallet.id}`} state={{wallet}}
                      >
                        Payout Request
                      </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No wallet history found.</p>
                )}
              </div>

          
          </div>
        )}
    </div>
  );
}

export default WalletPage;
