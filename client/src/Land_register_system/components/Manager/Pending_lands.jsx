import React from 'react'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import LandContext from '../../Land_contexts/LandContext'

export const Pending_lands = () => {
    const { state:{ contract,accounts },db } = useContext(LandContext)
    const [lands_pending,setLands_pending] = useState([])

    const setPendingLands =async () => {
        const _docSnap =await getDocs(collection(db,'pending_lands'))
        _docSnap.forEach(doc_each => {
            setLands_pending(oldArray => [...oldArray,doc_each.id])
        })

    }

    useEffect(() => {
        setPendingLands()
    },[])


  return (
    <div>
       
                <Table bordered hover>
                <thead>
                    <tr className='fw-bold'>
                        <td>Number</td>
                        <td>Land Number</td>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{lands_pending[0]}</td>
                    </tr>
                </tbody>
            </Table>
</div>
)
}
