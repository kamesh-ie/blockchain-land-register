import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import LandContext from '../../Land_contexts/LandContext';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

export default function Register_land_form() {
  const { state: { contract, accounts }, db } = useContext(LandContext);
  const [loc_state, setLoc_state] = useState('')
  const [district, setDistrict] = useState('')
  const [location, setLocation] = useState('')
  const [landmark, setLandmark] = useState('')
  const [plotNo, setPlotNo] = useState('')
  const [latitude,setLatitude] = useState('')
  const [longitude,setLongitude] = useState('')


  const splitNumberDecimal = number => number.split('.')

  const land_register = async (e) => {
    e.preventDefault();
    const latitude_number = splitNumberDecimal(latitude)
    const longitude_number = splitNumberDecimal(longitude)
    console.log(latitude_number,longitude_number)
    const result = await contract.methods.register(loc_state, district, location, landmark, plotNo,parseInt(latitude_number[0]),parseInt(longitude_number[0]),latitude_number[1],longitude_number[1]).send({ from: accounts[0] });
    console.log(result)
    const land_unique_number = result.events.register_return.returnValues.Land_unique_number

    await setDoc(doc(db,'registered_lands',land_unique_number),{
      added_time:serverTimestamp(),
    })



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
            <FloatingLabel controlId="floatingInput" label="latitude">
              <Form.Control type="input" placeholder="latitude" value={latitude} onChange={e => setLatitude(e.target.value)} required />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>


          <Col sm={6}>
            <FloatingLabel controlId="floatingInput" label="longitude">
              <Form.Control type="input" placeholder="longitude" value={longitude} onChange={e => setLongitude(e.target.value)} required />
            </FloatingLabel>
          </Col>
        </Row>






        <Button size='lg' type='submit' variant='dark'>Register</Button>
      </Form>
)
}
