import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import LandContext from '../../Land_contexts/LandContext'

export const Buyer = () => {
  const { state:{ contract,accounts },db } = useContext(LandContext)
  const [land_number,setLand_number] = useState()



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
    <div>
        <Form onSubmit={give_request}>
          <Form.FloatingLabel label='land number'>
            <Form.Control value={land_number} onChange={e => setLand_number(e.target.value)} placeholder='land number' />
          </Form.FloatingLabel>
          <Button type='submit'>Give Request</Button>
        </Form>
    </div>
  )
}
