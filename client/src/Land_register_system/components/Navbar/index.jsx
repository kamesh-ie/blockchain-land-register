import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './Land_Navbar.css'

export const Land_Navbar = () => {
  return (
    <div>
         <Navbar bg="light" expand="lg">
      <Container  className='ms-5' fluid>
        <Navbar.Brand style={{flexGrow:'4'}} href="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to={'/land'} >Home</Link></Nav.Link>
            <Nav.Link><Link to={'/land/owner'} >Owner</Link></Nav.Link>
            <Nav.Link><Link to={'/land/manager'} >Manager</Link></Nav.Link>
            <Nav.Link><Link to={'/land/buy'} >Buyer</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
