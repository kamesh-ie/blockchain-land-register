import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import LandContext from '../../Land_contexts/LandContext'
import { Marker, InfoWindow } from '@react-google-maps/api'
import { G_map } from './G_map'

export const Maps = () => {

  const { state: { contract, accounts } } = useContext(LandContext)
  const [markers, setMarkers] = useState([])
  const [infobox, setInfobox] = useState('')
  const lands = [
    {
      name: "registered",
      arr: 0,
      bg_color:'lightblue',
    },
    {
      name: "pending",
      arr: 1,
      bg_color:'yellow',
    },
    {
      name: "sold",
      arr: 2,
      bg_color:'lightgreen',
    }
  ]

  const addMarkers = () => {
    lands.forEach(async (lands_obj) => {
      let arr_leng = await contract.methods.registered_pending_length(lands_obj.arr).call({ from: accounts[0] })
      const store_marker = []
      for (var i = 0; i < arr_leng; i++) {
        console.log("called")
        if (lands_obj.arr == 0) {
          var land_number = await contract.methods.registered_lands(i).call({ from: accounts[0] })
        }
        else if(lands_obj.arr==1){
          var land_number = await contract.methods.pending_lands(i).call({ from: accounts[0] })
        }
        else{
          var land_number = await contract.methods.sold_lands(i).call({ from: accounts[0] })
        }

        var owner1 = await contract.methods.Owner1(land_number).call({ from: accounts[0] })
        var owner2 = await contract.methods.Owner2(land_number).call({ from: accounts[0] })
        var coor_position = {
          lat: parseFloat(owner2[3].numeric + '.' + owner2[3].decimal),
          lng: parseFloat(owner2[4].numeric + '.' + owner2[4].decimal)
        }
        const divStyle = {
          background: lands_obj.bg_color,
          border: `1px solid #ccc`,
          padding: 15
        }
        let infobox_obj = <InfoWindow
        onCloseClick={() => setInfobox([])}
        position={coor_position}
      >
        <div style={divStyle}>
                {land_number} <br />
                {lands_obj.name}
        </div>
      </InfoWindow>
        let marker_obj = <Marker position={coor_position} onClick={e => setInfobox(infobox_obj)} />
        store_marker.push(marker_obj)
      }
      setMarkers(oldArray => [...oldArray, ...store_marker])
    })
  }

  useEffect(() => {
    if (contract != null) {
      addMarkers()
    }
  }, [contract])


  return (
    <>
      <G_map markers={markers} infobox={infobox} />
    </>
  )
}
