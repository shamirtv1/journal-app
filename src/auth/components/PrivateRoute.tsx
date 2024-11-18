import {Navigate} from "react-router-dom";
import UseCheckAuth from "../../hooks/useCheckAuth.tsx";

const PrivateRoute = ({ Component }: { Component: any }) => {

    const { status } = UseCheckAuth();
    return (status === 'authenticated') ? Component : <Navigate to="/auth/login" />;

};

export default PrivateRoute;