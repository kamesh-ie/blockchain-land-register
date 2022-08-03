import React, { useState } from 'react'
import { useContext } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import LandContext from '../../Land_contexts/LandContext';


export default function Add_manager_form() {
  const { state:{accounts,contract} } = useContext(LandContext)
  const [manager_address,setManager_address] = useState()
  const [location,setLocation] = useState()

  const add_Manager = async (e) => {
    e.preventDefault();
    console.log(accounts)
    const result = await contract.methods.addManager(manager_address).send({ from:accounts[0] })
    console.log(result)

  }





  return (
    <div>
        <Form onSubmit={add_Manager}>
          <h1>add manager</h1>
          <FloatingLabel controlId="floatingInput" label="manager_address">
            <Form.Control type="input" placeholder="manager_address" value={manager_address} onChange={e => setManager_address(e.target.value)} required/>
          </FloatingLabel>
          <Button type='submit' size='lg' variant='dark'>Add</Button>
        </Form>
    </div>
  )
}
