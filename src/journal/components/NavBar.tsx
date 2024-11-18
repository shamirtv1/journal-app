import {AppBar, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {LogoutOutlined, MenuOutlined} from "@mui/icons-material";
import {useAppDispatch} from "../../store";
import { startLogout } from "../../store/auth";

const NavBar = ({drawerWidth = 240}: { drawerWidth: number }) => {

    const dispatch = useAppDispatch(); // DISPATCH DE LOS THUNKS

    const onLogout = () => {
        if(confirm("Esta seguro de terminar su session")) dispatch( startLogout() )
    }


    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)`},
                ml: {sm: `${drawerWidth}px`}
            }}>

            <Toolbar>
                <IconButton color="inherit" aria-label="menu" edge="start" sx={{ mr:2, display: { sm: 'none' } }}>
                    <MenuOutlined/>
                </IconButton>

                <Grid container direction="row" justifyContent="space-between" alignItems={'center'}>
                    <Typography variant={'h6'} noWrap component={'div'}>Jornaul App</Typography>

                    <IconButton color="error" onClick={onLogout}>
                        <LogoutOutlined/>
                    </IconButton>

                </Grid>

            </Toolbar>
        </AppBar>
    );
};

export default NavBar;