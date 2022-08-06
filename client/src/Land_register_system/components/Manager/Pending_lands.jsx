import React from 'react'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import LandContext from '../../Land_contexts/LandContext'

export const Pending_lands = ({ lands_pending,setLands_pending,lands_registered,setLands_registered }) => {
    const { state: { contract, accounts }, db } = useContext(LandContext)

    const setPendingLands = async () => {
        let _refArray = []
        const _pending_array_length = await contract.methods.registered_pending_length(1).call({ from:accounts[0] })
        console.log(_pending_array_length)
        for(var i =0;i<_pending_array_length;i++){
            let land_number = await contract.methods.pending_lands(i).call({ from:accounts[0] })
            _refArray.push(land_number)
        }
        setLands_pending(_refArray)

    }
    const setRegisteredLands = async () => {
        let _refArray = []
        const _registered_array_length = await contract.methods.registered_pending_length(0).call({ from:accounts[0] })
        for(var i =0;i<_registered_array_length;i++){
            let land_number = await contract.methods.registered_lands(i).call({ from:accounts[0] })
            _refArray.push(land_number)
        }
        setLands_registered(_refArray)

    }

    useEffect(() => {

       setPendingLands()
        setRegisteredLands()
    },[])


    return (
        <>
            <Container fluid className='d-flex'>
                <div className='me-2' style={{ flexGrow: '1' }}>
                    <h1>Registered lands</h1>
                    <Table bordered hover>
                        <thead>
                            <tr className='fw-bold'>
                                <td>Number</td>
                                <td>Land Number</td>

                            </tr>
                        </thead>
                        <tbody>
                            {lands_registered && lands_registered.map((value, id) => {
                                return (
                                    <tr>
                                        <td>{id+1}</td>
                                        <td>{value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>




                <div style={{ flexGrow: '1' }}>
                    <h1>pending lands</h1>
                    <Table bordered hover>
                        <thead>
                            <tr className='fw-bold'>
                                <td>Number</td>
                                <td>Land Number</td>

                            </tr>
                        </thead>
                        <tbody>
                        {lands_pending && lands_pending.map((value, id) => {
                                return (
                                    <tr>
                                        <td>{id+1}</td>
                                        <td>{value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    )
}
