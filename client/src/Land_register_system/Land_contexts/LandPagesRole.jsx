import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import LandContext from './LandContext'
import { user_roles } from './State'

export const LandPagesRole = ({ children, role }) => {

    const { state } = useContext(LandContext)
    const [_result, setResult] = useState(undefined)

    const checkRoles = async () => {
        if (state.contract != null) {
            console.log(role)
            const result = await state.contract.methods.role(state.accounts[0]).call({ from: state.accounts[0] })
            if (result == user_roles.user) {
                if (role == user_roles.user) {
                    setResult(children)
                }
                else {
                    setResult(<h1>you are not authorized to view this page</h1>)
                }
            }
            else if (result == user_roles.manager) {
                if (role == user_roles.manager || role == user_roles.user) {
                    setResult(children)
                }
                else {
                    setResult(<h1>you are not authorized to view this page</h1>)
                }
            }
            else {
                setResult(children)
            }
        }
    }

    useEffect(() => {
        checkRoles();
    }, [children, state])


    return (
        <>
            {_result ? _result : <h2>Loading</h2>}
        </>
    )
}