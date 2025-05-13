import React,{useState} from "react";
import { AddHiacesPage } from "../../../Pages/AllPages";
import TitlePage from '../../../Components/TitlePage'
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const AddHiacesLayout = () => {
      const [update, setUpdate] = useState(false)
      const navigate = useNavigate()
  return (
    <>
    <div className="flex gap-3">
    <button
            onClick={() => navigate(-1)}
            className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-800 transition-all"
        >
        <MdArrowBackIosNew/>
    </button>
    <TitlePage text={'Add Mini Van'} />
    
    </div>
    <AddHiacesPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default AddHiacesLayout;