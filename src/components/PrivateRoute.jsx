import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from './Spinner';

function PrivateRoute() {
    const {loggedIn, chekingStatus} = useAuthStatus()
    if(chekingStatus){
        return (
            <Spinner />
        )
    }
  return (
    loggedIn ? <Outlet /> : <Navigate to={'/sign-in'} />
  )
}

export default PrivateRoute