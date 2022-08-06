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
        const result1 = await contract.methods.Owner1(number).call({ from: accounts[0] })
        const result2 = await contract.methods.Owner2(number).call({ from: accounts[0] })


        var t = (
            <div>
                <Container style={{fontSize:'20px',width:'100vw',overflow:'auto'}}>
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
                            <td>latitude</td>
                            <td>longitude</td>
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
                            <td>{result1[6]}</td>
                            <td>{String(result2[0])}</td>
                            <td>{String(result2[1])}</td>
                            <td>{result2[2]}</td>
                            {console.log(result1,result2)}
                            <td>{result2[3].numeric+'.'+result2[3].decimal}</td>
                            <td>{result2[4].numeric+'.'+result2[4].decimal}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>: null}
            </Container>
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
