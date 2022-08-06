import React from 'react'
import { GoogleMap, LoadScript } from "@react-google-maps/api"

export const G_map = ({ markers,infobox }) => {
    return (
        <div>
            <LoadScript googleMapsApiKey=''>
                <GoogleMap zoom={6} center={{lat:13.0067,lng:80.2206}} mapContainerStyle={{ width: '90vw', height: '90vh' }}>
                    {markers.map(marker => marker)}
                    {infobox}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}
