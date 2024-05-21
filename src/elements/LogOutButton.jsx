import React from 'react'
import Boton from './Boton'
import { auth } from '../firebase/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const LogOutButton = () => {
    const Navigate = useNavigate()
    const logOut = async () => {
        try {
            await signOut(auth)
            localStorage.clear('userToken');

            Navigate('/sign-in')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Boton as="button" className='logout' onClick={logOut}>
                Cerrar Sesión
            </Boton>

        </>
    )
}

