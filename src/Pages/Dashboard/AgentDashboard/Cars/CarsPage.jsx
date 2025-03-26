import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaWhatsapp, FaEdit,FaCopy,FaFileExcel ,FaSearch,FaFilter } from "react-icons/fa";
import { Link} from 'react-router-dom';
import { GrCurrency } from "react-icons/gr";
import { useAuth } from '../../../../Context/Auth';
import { CiFilter } from "react-icons/ci";

const CarsPage = ({ update, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { refetch: refetchCars, loading: loadingCars, data: carData } =useGet({ url:`${apiUrl}/agent/car` });
    const [cars, setCars] = useState([])
    const {deleteData, loadingDelete, responseDelete} = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const [searchText, setSearchText] = useState("");
    const auth = useAuth()

    //Pagination State
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      refetchCars();
    }, [refetchCars, update]);

    useEffect(() => {
        if (carData && carData.cars) {
                console.log("car Data:", carData);
                setCars(carData.cars);
        }
    }, [carData]); 
  
      const handleOpenDelete = (item) => {
          setOpenDelete(item);
      };
      const handleCloseDelete = () => {
          setOpenDelete(null);
      };
  
      // Delete Language
      const handleDelete = async (id, name) => {
              const success = await deleteData(`${apiUrl}/agent${id}`, `${name} Deleted Success.`);
  
              if (success) {
                  // Update Discounts only if changeState succeeded
                  setCars(
                    cars.filter((car) =>
                      car.id !== id
                          )
                  );
              }
      };
 
      const uniqueCar = [...new Set(cars.map(car => car.model?.name).filter(Boolean))];
      
    //   // Handle input changes
      const handleSearch = (e) => setSearchText(e.target.value.toLowerCase());
      // const handleFilter = (e) => setSelectedDepartment(e.target.value);

      const filteredCar= cars.filter((car) => {
        const matchesSearch =
        cars?.mode?.name?.toLowerCase().includes(searchText)
        // employee?.user_name?.toLowerCase().includes(searchText) ||
        // employee?.email?.toLowerCase().includes(searchText) ||
        // employee?.address?.toLowerCase().includes(searchText) ||
        // employee?.phone?.includes(searchText) ;

        // const departmentMatch = selectedDepartment ? employee.department?.name === selectedDepartment : true;

        return matchesSearch  ;
      });

    //   // Pagination Logic
      const totalPages = Math.ceil(filteredCar.length / rowsPerPage);
      const paginatedData = filteredCar.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

      const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
      const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
      const handleRowsChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when rows per page changes
      };
     
      const headers = ['Name','Brand','Category',"Phone","Department","Address","Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingCars || loadingDelete  ? (
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
                      placeholder="Search by name..."
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
                     {paginatedData.length === 0 ? (
                          <tr>
                          <td colSpan="4" className="text-center text-xl text-gray-500 py-4">
                            No Cars Found
                          </td>
                        </tr>
                      ) : (
                        paginatedData.map((car, index) => ( // 👈 Use filteredleads
                          <tr
                            key={index}
                            className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                          >
                            <td className="text-center py-2 text-gray-600">{index + 1}</td>
                            <td className="text-center py-2 text-gray-600 relative">
                                <span className="block max-w-[150px] truncate mx-auto cursor-pointer group">
                                  {car?.model?.name || "-"}
                                  {car?.model?.name &&car?.model?.length > 15 && (
                                    <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                                      {car?.model?.name}
                                    </span>
                                  )}
                                </span>
                            </td> 
                            <td className="text-center py-2 text-gray-600">
                              <div className="flex justify-center">
                                  <img src={employee.image_link}
                                        className="rounded-md h-14 object-cover w-24"
                                        alt="Logo"
                                  />
                              </div>
                            </td>
                            <td className="text-center py-2 text-gray-600 relative">
                              <a
                                href={`mailto:${employee?.email}`}
                                className="truncate max-w-[120px] inline-block cursor-pointer group text-blue-500 hover:underline"
                              >
                                {employee?.email?.length > 15 ? employee?.email.slice(0, 15) + "..." : employee?.email || "-"}
                                <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1">
                                  {employee?.email}
                                </span>
                              </a>
                            </td>
                            <td className="text-center py-2 text-gray-600">
                                {employee?.phone ? (
                                  <div className="flex items-center justify-center gap-1">
                                    <span>{employee.phone}</span>
                                    <FaCopy
                                      className="text-gray-500 hover:text-blue-500 cursor-pointer"
                                      onClick={() => copyToClipboard(employee.phone)}
                                    />
                                  </div>
                                ) : (
                                  "-"
                                )}
                              {copiedPhone === employee.phone && <span className="text-green-500 text-xs ml-2">Copied!</span>}
                            </td>
                            {/* <td className="text-center py-2 text-gray-600">{employee?.department.name || "-"}</td>
                            <td className="text-center py-2 text-gray-600">{employee?.address || "-"}</td>
                            <td className="text-center py-2">
                              <div className="flex items-center justify-center gap-1">
                              <Link to={`edit/${employee.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                <button
                                  type="button"
                                  onClick={() => handleOpenDelete(employee.id)}
                                >
                                  <MdDelete color='#D01025' size="24"/>
                                </button>
                 
                                {openDelete === employee.id && (
                                  <Dialog
                                    open={true}
                                    onClose={handleCloseDelete}
                                    className="relative z-10"
                                  >
                                    <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                          <div className="flex  flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <PiWarningCircle color='#0D47A1'
                                            size="60"
                                            />
                                            <div className="flex items-center">
                                              <div className="mt-2 text-center">
                                                You will delete employee {employee?.name || "-"}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(employee.id, employee?.name)}>
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
          {/* <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-mainColor text-white hover:bg-blue-600"} transition-all`}
            >
              Previous
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-mainColor text-white hover:bg-blue-600"} transition-all`}
            >
              Next
            </button>
          </div> */}
              </div>
            )}
    </div>
  );
}

export default CarsPage;
