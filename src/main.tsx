import ReactDOM from 'react-dom/client'
import './global.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorPage } from './pages/Navegation/Error';
import { Login } from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Signup } from './pages/Signup';
import { Search } from './components/Search';
import { HomeNoAuth } from './pages/HomeNoAuth';
import { HomeAuth } from './pages/HomeAuth';
import { MyDisc } from './pages/MyDiscs';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
    <AuthProvider>
      {/* REACT ROUTER */}
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ErrorPage />} />
        
          <Route path='/' index element={<HomeNoAuth />} />
          <Route path='/signup' index element={<Signup />} />
          <Route path='/login' index element={<Login />} />

            <Route path=''  element={<PrivateRoutes />}>  
              <Route path='/home' index element={<HomeAuth />} />
              <Route path='/search' index element={<Search />} />
              <Route path='/myDiscs' index element={<MyDisc />} />
             </Route>
        </Routes>
      </BrowserRouter>
      {/* REACT ROUTER */}
    </AuthProvider>
  </React.Fragment>
)
