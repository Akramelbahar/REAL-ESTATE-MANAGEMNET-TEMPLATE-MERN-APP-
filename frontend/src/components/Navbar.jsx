import React from 'react'
import Profile from './Profile'

function Navbar({btnSignup ,isChat,isDashboard, btnLogin , btnLogout , profile}) {

  return (
    <><div className="navbar bg-base-300 relative ">
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
    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow w-full space-y-2">
    
    <li className={profile === "none" ? "hidden" : "md:hidden"}>
      <a href="/profile" className="btn btn-accent w-full">Profile</a>
    </li>

    <li className={(btnLogout === "none") || isDashboard ? "hidden" : "w-full"}>
      <a href="/dashboard" className="btn btn-accent w-full">Dashboard</a>
    </li>

    <li className={btnLogin === "none" ? "hidden" : "w-full"}>
      <a href="/login" className="btn btn-accent w-full">Se Connecter</a>
    </li>

    <li className={btnLogout === "none" || isChat ? "hidden" : "w-full"}>
      <a href="/chat" className="btn btn-accent w-full">💬</a>
    </li>

    <li className={btnSignup === "none" ? "hidden" : "w-full"}>
      <a href="signup" className="btn btn-accent w-full">S'Inscrire</a>
    </li>

    <li className="md:hidden w-full">
      <a href="insertAd" className="btn btn-accent w-full">Publier Une Annonce</a>
    </li>

    <li className={btnLogout === "none" ? "hidden" : "w-full"}>
      <a href="/logout" className="btn btn-accent w-full">Se Deconnecter</a>
    </li>
  </ul>
</div>

    <a className="btn btn-ghost text-xl" href="/">Biens Immobiliers</a>
  </div>
  <div className="navbar-center hidden md:flex">
  <div className={profile=="none "? "hidden": "mx-1"  }  ><a href="/profile"><Profile></Profile></a></div>
  
  </div>
      
  <div className="navbar-end">
  <ul className="menu menu-horizontal px-1 lg:flex flex-row flex-nowrap justify-center  hidden">
      <li className={btnLogout == "none"? "hidden": "btn  btn-accent ml-1 mr-1"  }  ><a href="/logout">Se Deconnecter</a></li>
      
      <li className={btnLogin == "none" ? "hidden" : "btn  btn-accent ml-1 mr-1"}><a href="/login">Se Connecter</a></li>
      <li className={btnLogout == "none" || isChat  ? "hidden" : "btn  btn-accent ml-1 mr-1"}><a href="/chat">💬</a></li>
      <li className={btnSignup=="none" ? "hidden": "btn  btn-accent ml-1 mr-1"  }  ><a href="signup">S'Inscrire</a></li>
      <li className={(btnLogout == "none" ) || isDashboard ? "hidden": "btn  btn-accent ml-1 mr-1"  }  ><a href="/dashboard">Dashboard</a></li>
      <a className="btn hidden lg:flex btn-accent ml-1 mr-1" href="insertAd">Publier Une Annonce
    </a>
    </ul>
    
  </div>
</div>

</>
  )
}

export default Navbar
