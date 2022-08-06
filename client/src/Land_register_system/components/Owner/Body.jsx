import React from 'react'
import { Col, Container, Row} from 'react-bootstrap';
import './body.css'
import Register_land_form from './Register_land_form';
import Add_manager_form from './Add_manager_form';
import { SearchForm } from './SearchForm';
import { useEffect } from 'react';
import { useContext } from 'react';
import LandContext from '../../Land_contexts/LandContext';

export default function Body() {
  const { state:{ contract,accounts } } = useContext(LandContext)

  return (
    <div>
      <Container fluid className='' style={{height:'100vh'}}>
        <Row>
          <Col className='d-flex justify-content-center mb-5' lg={7}><Register_land_form /></Col>
          <Col xl={12} className='mt-5' lg={5}><SearchForm /></Col>
        </Row>
      </Container>
    </div>
  )
}
