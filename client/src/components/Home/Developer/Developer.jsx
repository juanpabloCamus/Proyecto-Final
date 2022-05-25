import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchUsers} from '../../../redux/users'

function Developer() {
    const users=useSelector(state=>state.users.users)
  const dispatch=useDispatch()
  useEffect(
   ()=>
   {
    dispatch(fetchUsers())
   },   
  [dispatch])
    return (
    <div>
        <h1>Hola</h1>
        {

        users.map(e=> console.log(e))
        }
    </div>
  )
}

export default Developer