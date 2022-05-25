import { AppContainer } from "./components/app_container/AppContainer";

import { Auth0Provider } from '@auth0/auth0-react'
import { auth0UserDomain } from './helpers/env'
import { auth0UserId } from './helpers/env'

import { auth0CompanyDomain } from './helpers/env'
import { auth0CompanyId } from './helpers/env'
import Company from './components/Home/Company/Company'
import Jobs from './components/Home/Jobs/Jobs'
import Techs from './components/Home/Techs/Techs'

import { useSelector } from "react-redux";
import {  useState } from "react";
import Developer from "./components/Home/Developer/Developer";


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

  return <div className="App">
      <Auth0Provider 
        domain={ domain }
        clientId={ id } 
        redirectUri={ window.location.origin }
      >
          <AppContainer />
          <Developer/>
          <Company/>
          <Jobs/>
          <Techs/>
        </Auth0Provider>
      
    </div>
}

export default App;
