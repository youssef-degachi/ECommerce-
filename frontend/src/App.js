import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
    {/* call Header component to put navbar for all screen */}
      <Header /> 
      <main className='py-3'>
        <Container>
          <Outlet /> {/* go to index and call specific screen */}
        </Container>
      </main>
      {/* call Footer component to put footer for all screen */}
      <Footer />
      <ToastContainer /> {/* to call ToastContainer alert */}
    </>
  )
}

export default App