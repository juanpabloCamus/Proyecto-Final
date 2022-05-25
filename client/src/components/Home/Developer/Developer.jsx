import React, { useEffect } from 'react'
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

        <div>
            {users.length>0 ? users.map(e => <p>{e.name}  {e.last_name}</p>):<p>No hay nada</p>}
        </div>
    </div>
  )
}

export default Developer