import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {AgentProfilePage } from '../../../Pages/AllPages'

const AgentProfileLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center mb-2'>
    <TitlePage text={'Profile'} />
    </div>
      <AgentProfilePage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AgentProfileLayout;