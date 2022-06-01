import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../../../redux/users/users'
import Post from '../Post/Post'

function Favorites() {

    const userLocalStorage=JSON.parse(localStorage.getItem("userData"))
    console.log(userLocalStorage)
    const dispatch=useDispatch()
    const {favorites} = userLocalStorage
    useEffect(()=>
    {
      dispatch(fetchUser(userLocalStorage.id))
    },[dispatch, userLocalStorage.id])
  return (
    <div>
    {
        favorites > 0 ? 
        favorites.map( e => {
            return(
                <Post 
                key={e.id}
                id={e.id}
                position={e.position}
                salary_range={e.salary_range}
                time={e.time}
                requirements={e.requirements}
                seniority={e.seniority}
                company_accounts={e.company_accounts}
                technologies={e.technologies}
                description={e.description}
                english_level={e.english_level}
                />
            )
        })
        :
        <h3>You don't have any favorite jobs</h3>
    }
    </div>
  )
}

export default Favorites