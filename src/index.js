/* Packages needed */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminSite } from './components/Admin/AdminSite/AdminSite'

// Import JWT memory manager
import JWTManager from './utils/auth.utils'

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
        <Route path='/admin/*' element={<AdminSite />} />

      </Routes>
    </Provider>
  </BrowserRouter>,
  root
);