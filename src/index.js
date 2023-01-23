/* Packages needed */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import JWT memory manager
import JWTManager from './utils/auth.utils'
import axios from 'axios'

// Configure axios globals
axios.defaults.baseURL = process.env.REACT_API_URL
axios.defaults.headers.common['Authorization'] = `BEARER ${JWTManager.get()}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

/* Import the apps store */
import store from './store/store'

/* Components needed */
import Client from './components/Client/Client'

/* Styles needed */
import './index.css';

const root = document.getElementById('root')
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>

        {/* Client interface */}
        <Route path='/*' element={<Client />} />
        

        {/* Administration interface */}
        <Route path='/admin/*' element={<><h2>Administration website</h2></>} />

      </Routes>
    </Provider>
  </BrowserRouter>,
  root
);