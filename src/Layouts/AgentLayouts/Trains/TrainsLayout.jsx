import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {TrainsPage } from '../../../Pages/AllPages'
import AddButton from '../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const TrainsLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Train Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <TrainsPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default TrainsLayout;