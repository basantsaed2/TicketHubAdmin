import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {BookingDetailsPage } from '../../../Pages/AllPages'
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const BookingDetailsLayout = () => {
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate()
  
  return (
    <>
    <div className='flex justify-between items-center gap-3 mb-2'>
        <button
                    onClick={() => navigate(-1)}
                    className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-800 transition-all"
                >
                <MdArrowBackIosNew/>
            </button>
    <TitlePage text={'Booking Details'} />
    </div>
      <BookingDetailsPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default BookingDetailsLayout;