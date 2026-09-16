// TODO: build the PrivateRoute guard here — follow the auth demo from class.

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


function PrivateRoute () {
    const token = useAuthStore((state) => state.token)

    if (!token) {
        return<Navigate to="/login" replace />

    }

    return <Outlet/>

}

export default PrivateRoute
