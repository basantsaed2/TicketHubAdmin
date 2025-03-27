import React,{useState} from "react";
import { EditCarPage} from "../../../Pages/AllPages";
import TitlePage from '../../../Components/TitlePage'
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const EditCarsLayout = () => {
      const [update, setUpdate] = useState(false)
      const navigate = useNavigate()
  return (
    <>
    <div className="flex gap-3">
    <button
            onClick={() => navigate(-1)}
            className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
        >
        <MdArrowBackIosNew/>
    </button>
    <TitlePage text={'Edit Car'} />
    
    </div>
    <EditCarPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default EditCarsLayout;