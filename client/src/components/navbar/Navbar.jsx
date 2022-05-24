// import { useAuth0 } from "@auth0/auth0-react";

import React from 'react'

export const Navbar = () => {
  return (
    <nav>
        <div className="logo">
            <span>Logo</span>
        </div>
        <ul className="navbar">
            <li>
                <button>Developers</button>
            </li>
            <li>
                <button>Companies</button>
            </li>
        </ul>
    </nav>
  )
}

