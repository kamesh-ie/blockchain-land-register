import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import LandContext from '../../Land_contexts/LandContext'
import { Pending_lands } from './Pending_lands'

export const Body = () => {
    const { state: { accounts, contract } } = useContext(LandContext)
    const [number, setNumber] = useState('')
    const [land_price, setLand_price] = useState('')
    const [result1, setResult1] = useState('')
    const [result2, setResult2] = useState('')
    const [lands_pending, setLands_pending] = useState([])
    const [lands_registered, setLands_registered] = useState([])


    const setPrice = async e => {
        e.preventDefault();
        const _index = lands_registered.indexOf(number)
        const _result = await contract.methods.makeAvailable(number, land_price).send({ from: accounts[0] })
    }

    const req_details = async e => {
        e.preventDefault()
        const _result1 = await contract.methods.Owner1(number).call({ from: accounts[0] })
        const _result2 = await contract.methods.Owner2(number).call({ from: accounts[0] })
        setResult1(_result1)
        setResult2(_result2)
    }

    const setStatus = async e => {
        e.preventDefault()
        const _index = lands_pending.indexOf(number)
        const _result = await contract.methods.processRequest(number, land_price).send({ from: accounts[0] })
        // setResult(_result)
    }

    return (
        <>
            <Form onSubmit={req_details}>
                <Container className='d-flex justify-content-center'>
                    <Form.FloatingLabel className='m-0' label='Number'>
                        <Form.Control value={number} name='number' onChange={e => setNumber(e.target.value)} type='input' placeholder='number' />
                    </Form.FloatingLabel>
                    <Button type='submit'>Search</Button>
                </Container>
            </Form>
            <Container style={{ fontSize: '20px', width: '100vw', overflow: 'auto' }}>
                {result2 ? <div>
                    <Table bordered hover>
                        <thead>
                            <tr className='fw-bold'>
                                <td>State</td>
                                <td>District</td>
                                <td>location</td>
                                <td>landMark</td>
                                <td>plotNo</td>
                                <td>CurrentOwner</td>
                                <td>priceSelling</td>
                                <td>isAvailable</td>
                                <td>requester</td>
                                <td>requestStatus</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{String(result1[0])}</td>
                                <td>{String(result1[1])}</td>
                                <td>{String(result1[2])}</td>
                                <td>{String(result1[3])}</td>
                                <td>{String(result1[4])}</td>
                                <td>{String(result1[5])}</td>
                                <td>
                                    {parseInt(result1[6]) ? result1[6] : <Form className='d-flex' onSubmit={setPrice}>
                                        <Form.FloatingLabel className='m-0' label='Number'>
                                            <Form.Control name='land_price_number' value={land_price} onChange={e => { setLand_price(e.target.value); console.log(land_price) }} type='input' placeholder='number' />
                                        </Form.FloatingLabel>
                                        <Button type='submit'>Set</Button>
                                    </Form>}
                                </td>
                                <td>{String(result2[0])}</td>
                                <td>{String(result2[1])}</td>
                                <td>{parseInt(result2[2]) == 2 ? <Form className='d-flex' onSubmit={setStatus}>
                                    <Form.Select aria-label="Default select example" onChange={e => setLand_price(e.target.value)}>
                                        <option value="0">Select</option>
                                        <option value="3">Reject</option>
                                        <option value="4">Approve</option>
                                    </Form.Select>

                                    <Button type='submit'>Set</Button>
                                </Form> : parseInt(result2[2])} </td>
                            </tr>
                        </tbody>
                    </Table>
                </div> : null}
            </Container>
            <Pending_lands lands_pending={lands_pending} setLands_pending={setLands_pending} lands_registered={lands_registered} setLands_registered={setLands_registered} />
        </>
    )
}
