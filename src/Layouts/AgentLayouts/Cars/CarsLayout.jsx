import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {CarsPage } from '../../../Pages/AllPages'
import AddButton from '../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const CarsLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Car Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <CarsPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default CarsLayout;