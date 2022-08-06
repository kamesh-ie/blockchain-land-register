import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import LandContext from '../../Land_contexts/LandContext'
import { Marker,InfoBox } from '@react-google-maps/api'
import { G_map } from './G_map'

export const Maps = () => {

  const { state:{ contract,accounts } } = useContext(LandContext)
  const [markers,setMarkers] = useState([])
  const [infobox,setInfobox] = useState('')
  const lands = [
    {
      name:"registered_lands",
      arr:0,      
    },
    {
      name:"pending_lands",
      arr:1,      
    },
    {
      name:"sold_lands",
      arr:2,      
    }
  ]

  const addMarkers = () => { 
    lands.forEach(async (lands_obj) => {
      let arr_leng = await contract.methods.registered_pending_length(lands_obj.arr).call({ from:accounts[0] })
      const store_marker = []
      for(var i=0;i<arr_leng;i++){
        console.log("called")
        if(lands_obj.arr == 0){
          var land_number = await contract.methods.registered_lands(i).call({ from:accounts[0] })
          var owner1 = await contract.methods.Owner1(land_number).call({ from:accounts[0] })
          var owner2 = await contract.methods.Owner2(land_number).call({ from:accounts[0] })
          var coor_position = {
            lat:parseFloat(owner2[3].numeric+'.'+owner2[3].decimal),
            lng:parseFloat(owner2[4].numeric+'.'+owner2[4].decimal)
          }
          const options = { closeBoxURL: '', enableEventPropagation: true };
          console.log(coor_position)
          let infobox_obj = <InfoBox
          options={options}
          position={coor_position}
        >
          <div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 12 }}>
            <div style={{ fontSize: 16, fontColor: `#08233B` }}>
              {land_number}
            </div>
          </div>
        </InfoBox>
          let marker_obj = <Marker position={coor_position} onClick={e => setInfobox(infobox_obj)} />
          store_marker.push(marker_obj)
        }
      }
      setMarkers(oldArray => [...oldArray,...store_marker])
    })
   }

    useEffect(() => {
      if(contract!=null){
        addMarkers()
      }
    },[contract])


  return (
    <>
      {console.log(markers)}
      {markers.length==0 ? <h1>loaded...</h1> : <G_map markers={markers} infobox={infobox} />}
    </>
  )
}
