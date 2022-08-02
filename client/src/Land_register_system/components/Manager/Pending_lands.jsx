import React from 'react'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import LandContext from '../../Land_contexts/LandContext'

export const Pending_lands = () => {
    const { state: { contract, accounts }, db } = useContext(LandContext)
    const [lands_pending, setLands_pending] = useState({})
    const [land_status,setLand_status] = useState('')


    const setPendingLands = async () => {
        const _docSnap = await getDocs(collection(db, 'pending_lands'))
        _docSnap.forEach(async doc_each => {
            if (contract != null) {
                const pending_result = await contract.methods.Owner(doc_each.id).call({ from: accounts[0] })
                console.log(pending_result)
                setLands_pending(oldObject => {
                    let pending_result_str = JSON.stringify(pending_result)
                    let data = {...JSON.parse(`{"${doc_each.id}":${pending_result_str}}`)}
                    return {...oldObject,...data}
                })
            }
        })
        console.log(lands_pending)
    }

    useEffect(() => {
        console.log('called');
        setPendingLands()
    }, [contract])

    const setStatus = async e => {
        e.preventDefault()
        const _result = await contract.methods.processRequest(,land_price).send({ from: accounts[0] })
        setResult(_result)
    }

    return (
        <div>
            <Table bordered hover>
                <thead>
                    <tr className='fw-bold'>
                        <td>Number</td>
                        <td>State</td>
                        <td>District</td>
                        <td>PlotNo</td>
                        <td>Availability</td>
                        <td>Requester</td>
                        <td>RequestStatus</td>
                        <td>Price</td>

                    </tr>
                </thead>
                <tbody>
                    {Object.entries(lands_pending).map(([key,value]) => {
                        return (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{String(result[0])}</td>
                            <td>{String(result[1])}</td>
                            <td>{String(result[2])}</td>
                            <td>{String(result[3])}</td>
                            <td>{String(result[4])}</td>
                            <td>{parseInt(result[5])==1 ? <Form className='d-flex' onSubmit={setStatus}>
                              <Form.FloatingLabel className='m-0' label='Number'>
                              <Form.Control name='land_price_number' value={land_status} onChange={e => {setLand_status(e.target.value);console.log(land_price)}}  type='input' placeholder='number' />
                              </Form.FloatingLabel>
                              <Button type='submit'>Set</Button>
                            </Form> :parseInt(result[5])} </td>
                            <td>{result[6]}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
