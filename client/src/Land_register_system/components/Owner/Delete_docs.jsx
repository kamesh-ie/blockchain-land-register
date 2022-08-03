import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import LandContext from '../../Land_contexts/LandContext'

export const Delete_docs = () => {
    const { db } = useContext(LandContext)
    const [delete_confirm,setDelete_confirm] = useState(false)


    const delete_docs_func = async () => {
        const docs = await getDocs(collection(db,'pending_lands'))
        docs.forEach(async _doc => {
            await deleteDoc(doc(db,'pending_lands',_doc.id))
        })
        setDelete_confirm(true)
    }
    useEffect(() => {    
        delete_docs_func()    
    },[])
  return (
    <> {delete_confirm ? <h1>deleted</h1> : <h1>deleting</h1> } </>
  )
}
