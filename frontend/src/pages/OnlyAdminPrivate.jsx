import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

const OnlyAdminPrivate = () => {
  const {currentUser} = useSelector((state)=>state.user)
  return currentUser.isAdmin ? <Outlet/> : null ;
}

export default OnlyAdminPrivate