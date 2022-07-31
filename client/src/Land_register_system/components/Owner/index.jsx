import React, { useContext } from 'react'
import LandContext from '../../Land_contexts/LandContext'
import Body from './Body'
import Title from './Title'

export default function Owner() {
  const {state} = useContext(LandContext)
  const alert_msg = (
    <div>
      <p>metamask not connected properly</p>
    </div>
  )
  return (
    <div>
        <Title />
        <br />
        {
        !state.artifact ?  alert_msg:
          !state.contract ?  alert_msg:
            <Body />
      }
    </div>
  )
}
