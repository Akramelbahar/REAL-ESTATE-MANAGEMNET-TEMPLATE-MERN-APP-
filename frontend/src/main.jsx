import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import './index.css';
import './App.css';
import './layout.scss';

import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LogOut from './pages/LogOut.jsx';
import Home from './pages/Home.jsx';
import InsertAd from './pages/InsertAd.jsx';
import ToAgent from './components/ToAgent.jsx';
import EditProfile from './pages/EditProfile.jsx';
import EditAd from './pages/EditAd.jsx';
import AdDetails from './pages/AdDetails.jsx';
import Chat from './pages/Chat.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/toAgent" element={<ToAgent />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/insertAd" element={<InsertAd />} />
          <Route path="/ad/edit" element={<EditAd />} />
          <Route path='/chat/' element={<Chat></Chat>}></Route>
          <Route path='/chat/:id' element={<Chat></Chat>}></Route>
          <Route path="/advertisement/:id" element={<AdDetails></AdDetails>} />
          <Route path="/UserError" element={
            <a className="font-bold block text-center p-6 bg-base-300" href="/profile">
              Le Type De Votre Compte n'est pas agent. Pour changer le type de votre compte cliquez ici.
            </a>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

);
