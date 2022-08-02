import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "./pages/Admin";
import Anonymous from "./pages/Anonymous";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import {ToastContainer} from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="admin" element={<Admin/>}/>
        <Route path="booking" element={<Anonymous/>}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>,
  document.getElementById('root')
)
