import React , {useEffect} from 'react';
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
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminStats from './components/AdminStats.jsx';
import AdminAdsListe from './components/AdminAdsListe.jsx';
import AdminUserListe from './components/AdminUserListe.jsx';
import AdminAddUser from './components/AdminAddUser.jsx';

// PageTitle component definition
function PageTitle({ title, children }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <>{children}</>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageTitle title="Home"><Home /></PageTitle>} />
        <Route path="/signup" element={<PageTitle title="Sign Up"><SignUp /></PageTitle>} />
        <Route path="/toAgent" element={<PageTitle title="Become an Agent"><ToAgent /></PageTitle>} />
        <Route path="/profile" element={<PageTitle title="Edit Profile"><EditProfile /></PageTitle>} />
        <Route path="/login" element={<PageTitle title="Login"><Login /></PageTitle>} />
        <Route path="/dashboard" element={<PageTitle title="Dashboard"><Dashboard /></PageTitle>} />
        <Route path="/logout" element={<PageTitle title="Log Out"><LogOut /></PageTitle>} />
        <Route path="/insertAd" element={<PageTitle title="Insert Ad"><InsertAd /></PageTitle>} />
        <Route path="/ad/edit" element={<PageTitle title="Edit Ad"><EditAd /></PageTitle>} />
        <Route path='/chat/' element={<PageTitle title="Chat"><Chat /></PageTitle>} />
        <Route path='/chat/:id' element={<PageTitle title="Chat"><Chat /></PageTitle>} />
        <Route path="/advertisement/:id" element={<PageTitle title="Ad Details"><AdDetails /></PageTitle>} />
        <Route path="/UserError" element={
          <PageTitle title="User Error">
            <a className="font-bold block text-center p-6 bg-base-300" href="/profile">
              Le Type De Votre Compte n'est pas agent. Pour changer le type de votre compte cliquez ici.
            </a>
          </PageTitle>
        } />
        <Route path="/admin" element={<PageTitle title="Admin Dashboard"><AdminDashboard DashboardContent={<AdminStats />} /></PageTitle>} />
        <Route path='/admin/ads/' element={<PageTitle title="Admin - Ads List"><AdminDashboard DashboardContent={<AdminAdsListe />} /></PageTitle>} />
        <Route path='/admin/ads/add' element={<PageTitle title="Admin - Add Ad"><InsertAd /></PageTitle>} />
        <Route path='/admin/ads/list' element={<PageTitle title="Admin - Ads List"><AdminDashboard DashboardContent={<AdminAdsListe />} /></PageTitle>} />
        <Route path='/admin/user/' element={<PageTitle title="Admin - User Management"><AdminDashboard DashboardContent={""} /></PageTitle>} />
        <Route path='/admin/user/list' element={<PageTitle title="Admin - User List"><AdminDashboard DashboardContent={<AdminUserListe />} /></PageTitle>} />
        <Route path='/admin/user/add' element={<PageTitle title="Admin - Add User"><AdminDashboard DashboardContent={<AdminAddUser />} /></PageTitle>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
