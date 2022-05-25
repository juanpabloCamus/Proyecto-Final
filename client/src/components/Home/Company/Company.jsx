import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCompany } from '../../../redux/company/company'

function Developer() {
    const company=useSelector(state=>state.company.company)
    
  const dispatch=useDispatch()
  useEffect(()=>{
    
    dispatch(fetchCompany())
   },   
  [dispatch])

    return (
    <div>
        <h1>Hola</h1>

        <div>
         {console.log(company)}
        </div>
    </div>
  )
}

export default Developer