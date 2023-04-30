import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Layout = () => {
    return (
        <>
        
            <Header />
            <Outlet />
            <Footer />
            <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
        </>
    )
}

export default Layout