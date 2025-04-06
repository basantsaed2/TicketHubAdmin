import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {BookingReportsPage } from '../../../Pages/AllPages'

const BookingReportsLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Booking Reports Table'} />
    </div>
      <BookingReportsPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default BookingReportsLayout;