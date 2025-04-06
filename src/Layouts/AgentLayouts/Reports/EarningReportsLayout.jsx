import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {EarningReportsPage } from '../../../Pages/AllPages'

const BookingEarningLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Earning Reports Table'} />
    </div>
      <EarningReportsPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default BookingEarningLayout;