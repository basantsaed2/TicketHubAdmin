import React,{useState} from "react";
import { EditHiacesPage } from "../../../Pages/AllPages";
import TitlePage from '../../../Components/TitlePage'
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const EditHiacesLayout = () => {
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
    <TitlePage text={'Edit Hiace'} />
    
    </div>
    <EditHiacesPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default EditHiacesLayout;