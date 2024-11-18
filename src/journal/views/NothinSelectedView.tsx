import {Grid, Grid2, Typography} from "@mui/material";
import {StartOutlined} from "@mui/icons-material";

const NothinSelectedView = () => {
    return (
        <Grid2 container
               spacing={0}
               direction="column"
               alignItems="center"
               justifyContent="center"
               sx={{minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3}}
        >

            <Grid item xs={12}>
                <StartOutlined sx={{ fontSize: 100, color: 'white' }} />
            </Grid>

            <Grid item xs={12}>
                <Typography color={'white'} variant="h5">
                    Selecciona o crea una entrada
                </Typography>
            </Grid>

        </Grid2>
    );
};

export default NothinSelectedView;