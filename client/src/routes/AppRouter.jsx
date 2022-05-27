import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import Home  from '../components/Home/Home'
import {Routes,Route} from "react-router-dom"
import PostDetail from '../components/Home/User/Post/PostDetail/PostDeatail'
export const AppRouter = () => {
  return (
    <div>
  
          <Routes>
            <Route path='/'element={<Home/>} /> 
            <Route path='/*' element={ <Home/> } />
            <Route path='*' element={ <Home /> } />
            <Route path={'post/:id'} element={<PostDetail/>}/>
        </Routes>
          
  
    </div>
            /*Como hacer para que la ruta sea users*/
  )
}
