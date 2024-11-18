import {Outlet} from "react-router-dom";
import {Box, Toolbar} from "@mui/material";
import NavBar from "./components/NavBar.tsx";
import SideBar from "./components/SideBar.tsx";


const JournalLayout = () => {

   const drawerWidth = 240;

    return (

        <Box sx={{display: "flex"}} className={"animate__animated animate__fadeIn"}>

            <NavBar drawerWidth={drawerWidth} />

            <SideBar drawerWidth={drawerWidth} />

            <Box component='main' sx={{flexGrow: 1, p: 3}}>

                <Toolbar />



                <Outlet/>

            </Box>

        </Box>
    );
};

export default JournalLayout;