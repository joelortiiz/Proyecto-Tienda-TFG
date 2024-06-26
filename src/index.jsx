import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import IniciarSesion from './components/Inicio_sesion';
import RegistroUsuarios from './components/Registro_usuario';
import { AuthProvider } from './context/AuthContext';
import { Helmet } from 'react-helmet';
import { RutaPrivada } from './components/RutaPrivada';
import { Ordenadores } from './components/Ordenadores';
import { Ordenador } from './components/Ordenador';
import ErrorPage from './components/Error';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NewOrdenador } from './components/NewOrdenador';
import { ConfigOrdenador } from './components/ConfigOrdenador';
import { Compras } from './components/Compras';
import { PedidosConfirmed } from './components/PedidosConfirmed';
import { Admin } from './components/Admin';
import { RutaAdmin } from './components/RutaAdmin';
import { RevisarPedidos } from './components/RevisarPedidos';
import { ListaUsuarios } from './components/ListaUsuarios';
import ContactForm from './components/Contacto';
import { ListaPedidosConfirmedNotConfirmed } from './elements/pedidos/ListaPedidosNotConfirmed';


const Index = () => {
  return (
    <>
      <Helmet>
        <title>NextWell</title>
        <link rel="icon" href="./assets/images/logos/favicon.png" type="image/png" />

      </Helmet>
      <AuthProvider>
        <BrowserRouter>

          <Routes >
            <Route path='/sign-in' element={<IniciarSesion />} />
            <Route path='/sign-up' element={<RegistroUsuarios />} />
            <Route path="/" element={
              <RutaPrivada>
                <Navigate to="/home" />
              </RutaPrivada>
            } />
             <Route path='/Admin' element={
              <RutaAdmin>
                <Admin />
              </RutaAdmin>
            } />
               <Route path='/Admin/revisar-pedidos' element={
              <RutaAdmin>
                <RevisarPedidos />
              </RutaAdmin>
            } />
               <Route path='/Admin/lista-usuarios' element={
              <RutaAdmin>
                <ListaUsuarios />
              </RutaAdmin>
            } />
            <Route path='/home' element={
              <RutaPrivada>
                <Home />
              </RutaPrivada>
            } />

            <Route path='/ordenadores/' element={
              <RutaPrivada>
                <Ordenadores />
              </RutaPrivada>
            } />
            <Route path='/ordenador/:id' element={
              <RutaPrivada>
                <Ordenador />
              </RutaPrivada>
            } />
            <Route path='/ordenadores/newordenador' element={
              <RutaPrivada>
                <NewOrdenador />
              </RutaPrivada>
            } />
            <Route path='/Configurador-Pc' element={
              <RutaPrivada>
                <ConfigOrdenador />
              </RutaPrivada>
            } />
            <Route path='/User/Compras' element={
              <RutaPrivada>
                <Compras />
              </RutaPrivada>
            } />
             <Route path='/User/contacto' element={
              <RutaPrivada>
                <ContactForm />
              </RutaPrivada>
            } />
              <Route path='/User/Compras/Pedidos' element={
              <RutaPrivada>
                <PedidosConfirmed />
              </RutaPrivada>
            } />
              <Route path='/User/Compras/En-Curso' element={
              <RutaPrivada>
                <ListaPedidosConfirmedNotConfirmed />
              </RutaPrivada>
            } />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index />
);
