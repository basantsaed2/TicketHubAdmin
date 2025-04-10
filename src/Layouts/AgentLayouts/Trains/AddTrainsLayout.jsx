import React,{useState} from "react";
import { AddTrainsPage } from "../../../Pages/AllPages";
import TitlePage from '../../../Components/TitlePage'
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const AddTrainsLayout = () => {
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
    <TitlePage text={'Add Train'} />
    
    </div>
    <AddTrainsPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default AddTrainsLayout;