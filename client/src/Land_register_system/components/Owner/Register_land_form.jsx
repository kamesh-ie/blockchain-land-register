import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import LandContext from '../../Land_contexts/LandContext';

export default function Register_land_form() {
  const { state: { contract, accounts }, db } = useContext(LandContext);
  const [loc_state, setLoc_state] = useState()
  const [district, setDistrict] = useState()
  const [location, setLocation] = useState()
  const [landmark, setLandmark] = useState()
  const [plotNo, setPlotNo] = useState()
  const [ownerAddress, setOwnerAddress] = useState()
  const [priceSelllng, setPriceSelllng] = useState()
  const [Number, setNumber] = useState()

  const land_register = async (e) => {
    e.preventDefault();
    const result = await contract.methods.register(loc_state, district, location, landmark, plotNo, ownerAddress, priceSelllng, Number).send({ from: accounts[0] });
    console.log(result)


  }
  return (
      <Form onSubmit={land_register}>
        <h1>register land</h1>
        <Row>


          <Col sm={6}>
            <FloatingLabel controlId="floatingInput" label="state">
              <Form.Control type="input" placeholder="state" value={loc_state} onChange={e => setLoc_state(e.target.value)} required />
            </FloatingLabel>
          </Col>


          <Col sm={6}>
            <FloatingLabel controlId="floatingInput" label="district">
              <Form.Control type="input" placeholder="district" value={district} onChange={e => setDistrict(e.target.value)} required />
            </FloatingLabel>
          </Col>


        </Row>



        <Row>


          <Col sm={6}>
            <FloatingLabel controlId="floatingInput" label="location">
              <Form.Control type="input" placeholder="location" value={location} onChange={e => setLocation(e.target.value)} required />
            </FloatingLabel>
          </Col>


          <Col sm={6}>
            <FloatingLabel controlId="floatingInput" label="landmark">
              <Form.Control type="input" placeholder="landmark" value={landmark} onChange={e => setLandmark(e.target.value)} required />
            </FloatingLabel>
          </Col>


        </Row>



        <Row>


          <Col sm={6}>
            <FloatingLabel controlId="floatingInput" label="plotNo">
              <Form.Control type="input" placeholder="plotNo" value={plotNo} onChange={e => setPlotNo(e.target.value)} required />
            </FloatingLabel>
          </Col>


          <Col sm={6}>
            <FloatingLabel controlId="floatingInput" label="ownerAddress">
              <Form.Control type="input" placeholder="ownerAddress" value={ownerAddress} onChange={e => setOwnerAddress(e.target.value)} required />
            </FloatingLabel>
          </Col>


        </Row>



        <Row>


          <Col sm={6}>
            <FloatingLabel controlId="floatingInput" label="priceSelllng">
              <Form.Control type="input" placeholder="priceSelllng" value={priceSelllng} onChange={e => setPriceSelllng(e.target.value)} required />
            </FloatingLabel>
          </Col>


          <Col sm={6}>
            <FloatingLabel controlId="floatingInput" label="Number">
              <Form.Control type="input" size='sm' placeholder="Number" value={Number} onChange={e => setNumber(e.target.value)} required />
            </FloatingLabel>
          </Col>


        </Row>






        <Button size='lg' type='submit' variant='dark'>Register</Button>
      </Form>
)
}
