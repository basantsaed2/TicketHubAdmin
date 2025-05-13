import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {HiacesPage } from '../../../Pages/AllPages'
import AddButton from '../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const HiacesLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Mini Van Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <HiacesPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default HiacesLayout;