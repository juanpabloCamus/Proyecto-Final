import { useSelector } from "react-redux"
import { useLocation, Navigate } from "react-router"


export const RequireAuth = ({allowedRole, children}) => {

const location = useLocation()
const { isLogged } = useSelector(state => state.auth)


// console.log(isLogged.profileType)
console.log(allowedRole)
 

  return (
    ["company"].find(item => allowedRole.includes(item))
    ?
    children
    :
    <Navigate to="/" state={{from: location}} replace/>
  )
}
