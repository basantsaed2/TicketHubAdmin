import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {BusesPage } from '../../../Pages/AllPages'
import AddButton from '../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const BusesLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Bus Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <BusesPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default BusesLayout;