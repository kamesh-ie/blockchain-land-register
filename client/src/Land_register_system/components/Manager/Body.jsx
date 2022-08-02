import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import LandContext from '../../Land_contexts/LandContext'
import { Pending_lands } from './Pending_lands'

export const Body = () => {
    const { state: { accounts, contract } } = useContext(LandContext)
    const [number, setNumber] = useState('')
    const [land_price,setLand_price] = useState('')
    const [result,setResult] = useState('')


    const setPrice = async e => {
        e.preventDefault();
        const _result = await contract.methods.makeAvailable(number,land_price).send({ from: accounts[0] })
    }

    const req_details = async e => {
        
        e.preventDefault()
        const _result = await contract.methods.Owner(number).call({ from: accounts[0] })
        setResult(_result)


    }

    const setStatus = async e => {
        e.preventDefault()
        const _result = await contract.methods.processRequest(number,land_price).send({ from: accounts[0] })
        setResult(_result)
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
            <Container style={{fontSize:'20px'}}>
                {result ? <div>
                <Table bordered hover>
                    <thead>
                        <tr className='fw-bold'>
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
                        <tr>
                            <td>{String(result[0])}</td>
                            <td>{String(result[1])}</td>
                            <td>{String(result[2])}</td>
                            <td>{String(result[3])}</td>
                            <td>{String(result[4])}</td>
                            <td>{parseInt(result[5])==1 ? <Form className='d-flex' onSubmit={setStatus}>
                              <Form.FloatingLabel className='m-0' label='Number'>
                              <Form.Control name='land_price_number' value={land_price} onChange={e => {setLand_price(e.target.value);console.log(land_price)}}  type='input' placeholder='number' />
                              </Form.FloatingLabel>
                              <Button type='submit'>Set</Button>
                            </Form> :parseInt(result[5])} </td>
                            <td>
                            {parseInt(result[6]) ? result[6] : <Form className='d-flex' onSubmit={setPrice}>
                              <Form.FloatingLabel className='m-0' label='Number'>
                              <Form.Control name='land_price_number' value={land_price} onChange={e => {setLand_price(e.target.value);console.log(land_price)}}  type='input' placeholder='number' />
                              </Form.FloatingLabel>
                              <Button type='submit'>Set</Button>
                            </Form>}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>: null}
            </Container>
            <Pending_lands />
        </>
    )
}
