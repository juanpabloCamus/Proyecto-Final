import { AppContainer } from "./components/app_container/AppContainer";
import { Auth0Provider } from '@auth0/auth0-react'

import { auth0UserDomain } from './helpers/env'
import { auth0UserId } from './helpers/env'

import { auth0CompanyDomain } from './helpers/env'
import { auth0CompanyId } from './helpers/env'

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


function App() {
  
const [domain, setDomain] = useState('')
const [id, setId] = useState('')

const { clientType } = useSelector(state => state.auth)


if(clientType === 'developer'){
  setDomain(auth0UserDomain)
  setId(auth0UserId)
} 

if( clientType === 'company' ){
  setDomain(auth0CompanyDomain)
  setId(auth0CompanyId)
}

console.log(domain)
console.log(id)

  return <div className="App">
      <Auth0Provider 
        domain={ domain }
        clientId={ id } 
        redirectUri={ window.location.origin }
      >
          <AppContainer />
        </Auth0Provider>
      
    </div>
}

export default App;
