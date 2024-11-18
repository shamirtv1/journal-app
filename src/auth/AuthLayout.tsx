import {Outlet} from "react-router-dom";
import {Grid2} from "@mui/material";

const AuthLayout = () => {
    return (
        <Grid2 container
               spacing={0}
               direction="column"
               alignItems="center"
               justifyContent="center"
               sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
        >

            <Outlet />

        </Grid2>
    );
};

export default AuthLayout;