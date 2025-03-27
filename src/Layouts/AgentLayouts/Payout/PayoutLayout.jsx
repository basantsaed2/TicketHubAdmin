import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {PayoutPage } from '../../../Pages/AllPages'
import AddButton from '../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const PayoutLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Payout Table'} />
    <Link to='add'>
        <AddButton text="Request"/>
    </Link>
    </div>
      <PayoutPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default PayoutLayout;