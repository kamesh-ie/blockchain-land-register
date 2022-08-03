import React from 'react'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import LandContext from '../../Land_contexts/LandContext'

export const Pending_lands = () => {
    const { state: { contract, accounts }, db } = useContext(LandContext)
    const [lands_pending, setLands_pending] = useState([])
    const [lands_registered, setLands_registered] = useState([])

    const setPendingLands = async () => {
        const _docSnap = await getDocs(collection(db, 'pending_lands'))
        _docSnap.forEach(doc_each => {
            setLands_pending(oldArray => [...oldArray, doc_each.id])
        })

    }
    const setRegisteredLands = async () => {
        const _docSnap = await getDocs(collection(db, 'registered_lands'))
        _docSnap.forEach(doc_each => {
            setLands_registered(oldArray => [...oldArray, doc_each.id])
        })

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
