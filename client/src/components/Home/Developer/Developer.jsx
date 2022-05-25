import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchUsers} from '../../../redux/users/users'

function Developer() {
    const users=useSelector(state=>state.users.users)
  const dispatch=useDispatch()
  useEffect(()=>{
    
    dispatch(fetchUsers())
   },   
  [dispatch])
    return (
    <div>
        <h1>Hola</h1>
        {/* {
         users.length > 0 ?
                users.map(e=> console.log(e)): <h2>NO SE ENCUENTRA N</h2>
        } */}
    </div>
  )
}

export default Developer