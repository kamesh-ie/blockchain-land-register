import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import LandContext from '../../Land_contexts/LandContext'

export const Buyer = () => {
  const { state:{ contract,accounts },db } = useContext(LandContext)
  const [land_number,setLand_number] = useState()
  const [purchaseLand_number,setPurchaseLand_number] = useState()

  const purchase_land = async e => {
    e.preventDefault();
    let result = await contract.methods.purchaseland(purchaseLand_number).send({ from:accounts[0],value:1000000000000000000 })
    const _docref = await getDoc(doc(db,'pending_lands',purchaseLand_number))
    await setDoc(doc(db,'purchased_lands',purchaseLand_number),_docref.data())
    await deleteDoc(doc(db,'pending_lands',_docref.id))
  }


  const give_request = async e => {
    e.preventDefault()
    const result = await contract.methods.requstTolandOwner(land_number).send({ from:accounts[0] })
    const pending_doc = await getDoc(doc(db,'registered_lands',land_number))
    if (pending_doc.exists())
    {await setDoc(doc(db,'pending_lands',land_number),pending_doc.data())
    await deleteDoc(doc(db,'registered_lands',land_number))}
    else{
      console.log('pending_doc not defined')
    }

  }



  return (
    <div className='ms-4'>
        <Form  onSubmit={give_request}>
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
    </div>
  )
}
