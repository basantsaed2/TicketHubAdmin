import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import { PrivateRequestPage } from '../../../Pages/AllPages'

const PrivateRequestLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Private Request Table'} />
    </div>
      <PrivateRequestPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default PrivateRequestLayout;