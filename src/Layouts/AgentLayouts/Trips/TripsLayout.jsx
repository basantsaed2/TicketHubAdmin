import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {TripsPage } from '../../../Pages/AllPages'
import AddButton from '../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const TripsLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Trip Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <TripsPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default TripsLayout;