import React from 'react'
import {Routes,Route} from "react-router-dom"
import CreateJob from '../components/Home/Company/CreateJob/CreateJob'
import Home from '../components/Home/Home'
import PostDetail from '../components/Home/User/Post/PostDetail/PostDeatail'


export const developerRoutes = () => {

  return (
    <div>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="home/post/:id" element={<PostDetail />} />
          <Route path="home/createjob" element={<CreateJob />} />
        </Routes>
    </div>
  )
}
