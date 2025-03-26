import React,{useState} from "react";
import { AddCarPage } from "../../../Pages/AllPages";
import TitlePage from '../../../Components/TitlePage'
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddCarsLayout = () => {
      const [update, setUpdate] = useState(false)
      const navigate = useNavigate()
  return (
    <>
    <div className="flex gap-3">
    <button
            onClick={() => navigate(-1)}
            className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
        >
            <FaArrowLeft/>
    </button>
    <TitlePage text={'Add Car'} />
    
    </div>
    <AddCarPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default AddCarsLayout;