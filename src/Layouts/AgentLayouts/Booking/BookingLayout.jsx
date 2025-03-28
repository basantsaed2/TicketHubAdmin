import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {BookingPage } from '../../../Pages/AllPages'
import AddButton from '../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const BookingLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Booking Table'} />
    {/* <Link to='add'>
        <AddButton />
      </Link> */}
    </div>
      <BookingPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default BookingLayout;