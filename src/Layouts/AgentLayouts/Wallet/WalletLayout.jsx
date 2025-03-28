import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {WalletPage } from '../../../Pages/AllPages'
import AddButton from '../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const WalletLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Wallet Table'} />
    {/* <Link to='add'>
        <AddButton />
      </Link> */}
    </div>
      <WalletPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default WalletLayout;