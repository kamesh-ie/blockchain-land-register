import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import LandContext from '../../Land_contexts/LandContext'
import { Maps } from '../maps'
import { SearchForm } from '../Owner/SearchForm'

export const Buyer = () => {
  const { state: { contract, accounts } } = useContext(LandContext)
  const [land_number, setLand_number] = useState()
  const [purchaseLand_number, setPurchaseLand_number] = useState()
  const [lands_registered, setLands_registered] = useState([])
  const [lands_pending, setLands_pending] = useState([])


  const setRegisteredLands = async () => {
    let _refArray = []
    const _registered_array_length = await contract.methods.registered_pending_length(0).call({ from: accounts[0] })
    for (var i = 0; i < _registered_array_length; i++) {
      let _land_number = await contract.methods.registered_lands(i).call({ from: accounts[0] })
      _refArray.push(_land_number)
    }
    setLands_registered(_refArray)

  }

  const setPendingLands = async () => {
    let _refArray = []
    const _pending_array_length = await contract.methods.registered_pending_length(1).call({ from: accounts[0] })
    console.log(_pending_array_length)
    for (var i = 0; i < _pending_array_length; i++) {
      let _land_number = await contract.methods.pending_lands(i).call({ from: accounts[0] })
      _refArray.push(_land_number)
    }
    setLands_pending(_refArray)

  }


  const purchase_land = async e => {
    e.preventDefault();
    let _index = lands_pending.indexOf(purchaseLand_number)
    console.log(lands_pending,purchaseLand_number,_index)
    let price = await contract.methods.Owner1(purchaseLand_number).call({ from: accounts[0] })
    let result = await contract.methods.purchaseland(purchaseLand_number, _index).send({ from: accounts[0], value: parseInt(price[6]) })
  }


  const give_request = async e => {
    e.preventDefault()
    let _index = lands_registered.indexOf(land_number)
    console.log(_index)
    const result = await contract.methods.requstTolandOwner(land_number, _index).send({ from: accounts[0] })
  }

  useEffect(() => {
    if (contract != null) {
      setRegisteredLands();
      setPendingLands();
    }
  }, [contract])



  return (
    <div className='ms-4'>
      <Form onSubmit={give_request}>
        <Form.FloatingLabel label='land number'>
          <Form.Control value={land_number} onChange={e => setLand_number(e.target.value)} placeholder='land number' />
        </Form.FloatingLabel>
        <Button className='my-3' type='submit'>Give Request</Button>
      </Form>
      <Form onSubmit={purchase_land}>
        <Form.FloatingLabel label='land number'>
          <Form.Control value={purchaseLand_number} onChange={e => setPurchaseLand_number(e.target.value)} placeholder='land number' />
        </Form.FloatingLabel>
        <Button className='my-3' variant='success' type='submit'>Purchase</Button>
      </Form>
      <Row>
      <Col xl={12} className='mt-5' lg={5}><SearchForm /></Col>
      </Row>

      <div className="maps">
        <Maps />
      </div>
    </div>
  )
}
