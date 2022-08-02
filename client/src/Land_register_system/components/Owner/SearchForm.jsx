import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import LandContext from '../../Land_contexts/LandContext'

export const SearchForm = () => {
    const { state: { accounts, contract } } = useContext(LandContext)
    const [number, setNumber] = useState('')
    const [table, setTable] = useState('')



    const req_details = async e => {
        e.preventDefault()
        console.log(123)
        const result = await contract.methods.Owner(number).call({ from: accounts[0] })
        console.log(result[4])

        var t = (
            <div>
                <Table bordered hover>
                    <thead>
                        <tr className='fw-bold'>
                            <td>State</td>
                            <td>District</td>
                            <td>PlotNo</td>
                            <td>Availability</td>
                            <td>Requester</td>
                            <td>RequestStatus</td>
                            <td>Selling price</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {Object.values(result).map((val, id) => (
                                <td key={id}>{String(val)}</td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
        setTable(t)

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
                <Container style={{fontSize:'20px'}}>{table}</Container>
            </Form>
        </>
    )
}
