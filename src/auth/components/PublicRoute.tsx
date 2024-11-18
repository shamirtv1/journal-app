import UseCheckAuth from "../../hooks/useCheckAuth.tsx";
import {Navigate} from "react-router-dom";

const PublicRoute = ({ Component }: { Component: any }) => {

    const { status } = UseCheckAuth();
    return (status !== 'authenticated') ? Component : <Navigate to="/home" />;
};

export default PublicRoute;