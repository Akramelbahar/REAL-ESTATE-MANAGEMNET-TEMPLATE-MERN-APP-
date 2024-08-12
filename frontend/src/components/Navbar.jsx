import React from 'react'
import Profile from './Profile'

function Navbar({ btnSignup,MonCompte , isChat, isDashboard, btnLogin, btnLogout, profile }) {
  return (
    <div className="navbar bg-base-300 relative">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow w-52 space-y-2">
            
            {/* Profile */}
            <li className={profile === "none" ? "hidden" : "md:hidden flex justify-center"}>
              <a href="/profile" className="w-full">
                <Profile />
              </a>
            </li>

            {/* Dashboard */}
            <li className={(btnLogout === "none") || isDashboard ? "hidden" : ""}>
              <a href="/dashboard" className="btn btn-accent w-full text-center">Dashboard</a>
            </li>
            <li className={MonCompte === "display" ? "" : "hidden"}>
              <a href="/login" className="btn btn-accent w-full text-center">Mon Compte</a>
            </li>
            {/* Login */}
            <li className={btnLogin === "none" ? "hidden" : ""}>
              <a href="/login" className="btn btn-accent w-full text-center">Se Connecter</a>
            </li>

            {/* Chat */}
            <li className={btnLogout === "none" || isChat ? "hidden" : ""}>
              <a href="/chat" className="btn btn-accent w-full text-center">💬</a>
            </li>

            {/* Signup */}
            <li className={btnSignup === "none" ? "hidden" : ""}>
              <a href="signup" className="btn btn-accent w-full text-center">S'Inscrire</a>
            </li>

            {/* Insert Ad */}
            <li className="md:hidden">
              <a href="insertAd" className="btn btn-accent w-full text-center">Publier Une Annonce</a>
            </li>

            {/* Logout */}
            <li className={btnLogout === "none" ? "hidden" : ""}>
              <a href="/logout" className="btn btn-accent w-full text-center">Se Deconnecter</a>
            </li>

          </ul>
        </div>
        <a className="btn btn-ghost text-xl" href="/">Biens Immobiliers</a>
      </div>

      <div className="navbar-center hidden md:flex">
        <div className={profile === "none" ? "hidden" : "mx-1"}>
          <a href="/profile">
            <Profile />
          </a>
        </div>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 lg:flex flex-row flex-nowrap justify-center hidden space-x-2">
          <li className={btnLogout === "none" ? "hidden" : ""}>
            <a href="/logout" className="btn btn-accent">Se Deconnecter</a>
          </li>
           <li className={MonCompte === "display" ? "" : "hidden"}>
              <a href="/login" className="btn btn-accent w-full text-center">Mon Compte</a>
            </li>
          <li className={btnLogin === "none" ? "hidden" : ""}>
            <a href="/login" className="btn btn-accent">Se Connecter</a>
          </li>
          <li className={btnLogout === "none" || isChat ? "hidden" : ""}>
            <a href="/chat" className="btn btn-accent">💬</a>
          </li>
          <li className={btnSignup === "none" ? "hidden" : ""}>
            <a href="signup" className="btn btn-accent">S'Inscrire</a>
          </li>
          <li className={(btnLogout === "none") || isDashboard ? "hidden" : ""}>
            <a href="/dashboard" className="btn btn-accent">Dashboard</a>
          </li>
          <li className="hidden lg:flex">
            <a href="insertAd" className="btn btn-accent">Publier Une Annonce</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
