import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {PaymentsPage } from '../../../Pages/AllPages'

const PaymentsLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Payments Table'} />
    </div>
      <PaymentsPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default PaymentsLayout;