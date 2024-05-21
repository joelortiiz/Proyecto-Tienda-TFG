import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import {Link, useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig';
import Alert from '../elements/Alert'
import './Inicio_sesion.css'
import logo from './../assets/images/logos/logo_original.jpeg'
import { motion } from "framer-motion" 
import googlelogo from "./../assets/images/logos/logo_google.png"

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const provider = new GoogleAuthProvider();


export const Inicio_sesion = () => {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [estadoAlerta, changeAlertStatus] = useState(false)
  const [alert, changeAlert] = useState({})

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    localStorage.setItem('userToken', token);

    // The signed-in user info.
   // const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    navigate('/home')

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.log(errorCode, " / ", errorMessage, " / ", email, " / ", credential)
    // ...
  });
  }
  const handleOnChange = (e) => {
    if(e.target.name === 'email'){
      setCorreo(e.target.value)
    } else if(e.target.name === 'password'){
      setPassword(e.target.value)
    }
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()
    debugger
    changeAlertStatus(false)
    changeAlert({})
    const validateEmail = 	/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    if(!validateEmail.test(correo)){
      changeAlertStatus(true)
     changeAlert({
      type: 'error',
      message: "Por favor ingrese un correo electronico valido"
     })
      return
    }
    if(correo === '' || password === '' ) {
      changeAlertStatus(true)
      changeAlert({
       type: 'error',
       message: "Todos los campos son obligatorios"
      })
      return
    }
  

    try {
      await signInWithEmailAndPassword(auth, correo, password)
      navigate('/home')
    } catch (error) {
      changeAlertStatus(true)
      let message;
      console.log(error.code)
      switch(error.code){
        case 'auth/invalid-credential':
					message = 'El usuario o contraseña no son correctos.'
					break;
				case 'auth/user-not-found':
          message = 'El usuario o contraseña no son correctos.'
					break;
				default:
					message = 'Hubo un error al intentar iniciar sesión.'
				break;
      }
      changeAlert({
        type: 'error',
        message: message
      })
    }
     
    }
  return (
    <>
      <Helmet>
        <title>Nextwell - Inicio Sesion</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Helmet>

<div className='container'>
    
     <header className='header'>
    
     <div className='card'> 
     <img src={logo} alt="" className='logo animated-image' />

     </div>
      </header>
      <main className='main'>
        <section className='section'>
        <article className='article'>
        <motion.h2
        className='form__title'
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Iniciar Sesion
      </motion.h2>
      <motion.div>
        
      </motion.div>
      <motion.form
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className='form'
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <input
          className='input'
          type='email'
          name='email'
          placeholder='Email'
          value={correo}
          onChange={handleOnChange}
        />
        
              </motion.div>
              <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <input
        className='input'
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handleOnChange}
        />
              </motion.div>

        <motion.div
        className='container__button'>
        <button as="button" type='submit'>Iniciar Sesion</button>
        </motion.div>
        <motion.div>
        
        </motion.div>
        <motion.div>
       
        </motion.div>
          

    </motion.form>
    <div>
        <Link to={"/sign-up"}>
        <button >Registro Usuario</button>
        </Link>
          </div>
    <div onClick={loginWithGoogle}>
    <img src={googlelogo} alt="" />


    </div>
    </article>
    
    </section>

    </main>

    </div>

      <Alert
      type={alert.type}
      message={alert.message}
      statusAlert={estadoAlerta}
      changeAlert={changeAlertStatus}
      />
  
    </>
  )
}
export default Inicio_sesion